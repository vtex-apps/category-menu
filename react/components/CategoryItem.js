import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { categoryItemShape } from '../propTypes'

import ItemTitle from './ItemTitle'
import ChildrenContainer from './ChildrenContainer'
import { getMenuPositionValues } from '../utils/categoryMenuPosition'
import ItemContainer from './ItemContainer'

/**
 * Component that renders a category and the container for its subcategories in the menu.
 */
const CategoryItem = ({
  category: { children, slug, name },
  isCategorySelected,
  menuPosition,
  subcategoryLevels,
}) => {
  const paramsForChild = (child, parentSlug) => {
    const params = {
      department: parentSlug || child.slug,
    }
    if (parentSlug) params.category = child.slug
    return params
  }

  const toSecondLevelChild = (itemSlug, child, subCategory) => {
    const { slug: parentSlug } = child
    const { slug } = subCategory

    const params = {
      department: itemSlug || parentSlug,
      category: itemSlug ? parentSlug : slug,
      ...(itemSlug && { subcategory: slug }),
    }

    return {
      ...subCategory,
      params,
      page: itemSlug ? 'store.search#subcategory' : 'store.search#category',
    }
  }

  const toItems = (children, slug) => {
    return (
      children &&
      children.map(child => ({
        ...child,
        children:
          child.children &&
          child.children.map(subCategory =>
            toSecondLevelChild(slug, child, subCategory)
          ),
        params: paramsForChild(child, slug),
        page: slug ? 'store.search#category' : 'store.search#department',
      }))
    )
  }

  return (
    <ItemContainer itemKey={name}>
      {({ isHovered, containerRef, setIsHovered }) => (
        <Fragment>
          <ItemTitle
            onClick={() => setIsHovered(false)}
            item={{
              name,
              ...(slug && { params: { department: slug } }),
              page: 'store.search#department',
            }}
            isSelected={isCategorySelected}
            showBorder={isHovered || isCategorySelected}
            menuPosition={menuPosition}
          />
          {subcategoryLevels > 0 && (
            <ChildrenContainer
              menuPosition={menuPosition}
              containerRef={containerRef}
              isShowing={isHovered}
              items={toItems(children, slug)}
              onCloseMenu={() => setIsHovered(false)}
              showSecondLevel={subcategoryLevels === 2}
            />
          )}
        </Fragment>
      )}
    </ItemContainer>
  )
}

CategoryItem.propTypes = {
  /** Category to be displayed */
  category: categoryItemShape.isRequired,
  /** Number of subcategory levels */
  subcategoryLevels: PropTypes.oneOf([0, 1, 2]),
  /** Defines the position of the category menu */
  menuPosition: PropTypes.oneOf(getMenuPositionValues()),
  /** Menu category selection */
  isCategorySelected: PropTypes.bool,
}

export default CategoryItem
