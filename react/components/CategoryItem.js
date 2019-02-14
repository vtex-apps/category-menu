import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { categoryItemShape } from '../propTypes'

import ItemTitle from './ItemTitle'
import ChildrenContainer from './ChildrenContainer'
import { getMenuDispositionValues } from '../utils/categoryMenuDisposition'
import ItemContainer from './ItemContainer'

/**
 * Component that represents a single category displayed in the menu. also displays
 * the subcategories, if the provided category has them
 */
const CategoryItem = ({
  category : { children, slug, name },
  isCategorySelected,
  menuDisposition,
  subcategoryLevels
}) => {

  const paramsForChild = (child, parentSlug) => {
    const params = {
      department: parentSlug || child.slug,
    }
    if (parentSlug) params.category = child.slug
    return params
  }

  const toSecondLevelChild = (itemSlug, child, subCategory) => {
    const { slug : parentSlug } = child
    const { slug } = subCategory
    
    const params = {
      department: itemSlug || parentSlug,
      category : itemSlug ? parentSlug : slug,
      ...(itemSlug && { subcategory: slug }),
    }
  
    return {...subCategory, params}
  }

  const toItems = (children, slug) => {
    return children && children.map(child => ({
      ...child,
      children: child.children && child.children.map(subCategory => toSecondLevelChild(slug, child, subCategory)),
      params: paramsForChild(child, slug),
    }))
  }
  
  return (
    <ItemContainer key={name}>
      {({ isHovered, containerRef, setIsHovered }) => (
        <Fragment>
          <ItemTitle
              onClick={() => setIsHovered(false)}
              item={{name, params: { department: slug } }} 
              page={"store.search#department"}
              isSelected={isCategorySelected} 
              showBorder={isHovered || isCategorySelected}
              menuDisposition={menuDisposition}
          />
          {subcategoryLevels > 0 && (
              <ChildrenContainer
                menuDisposition={menuDisposition}
                containerRef={containerRef}
                isShowing={isHovered}
                items={toItems(children, slug)}
                pageFirstLevel={slug ? 'store.search#category' : 'store.search#department'}
                pageSecondLevel={slug ? 'store.search#subcategory' : 'store.search#category' }
                onCloseMenu={() => setIsHovered(false)}
                showSecondLevel={subcategoryLevels === 2}
              />
            )
          }
          </Fragment>
        )
      }
    </ItemContainer>
  )
}

CategoryItem.propTypes = {
  /** Category to be displayed */
  category: categoryItemShape.isRequired,
  /** Number of subcategory levels */
  subcategoryLevels: PropTypes.oneOf([0, 1, 2]),
  /** Defines the disposition of the category menu */
  menuDisposition: PropTypes.oneOf(getMenuDispositionValues()),
  /** Menu category selection */
  isCategorySelected: PropTypes.bool,
}

export default CategoryItem