import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { categoryItemShape } from '../propTypes'

import ItemTitle from './ItemTitle'
import ItemContainer from './ItemContainer'
import categoryMenu from '../categoryMenu.css'
import {
  getMenuPositionValues,
} from '../utils/categoryMenuPosition'

/**
 * Component that represents a single category displayed in the menu. also displays
 * the subcategories, if the provided category has them
 */
export default class CategoryItem extends Component {
  state = {
    isHovered: false,
  }

  static propTypes = {
    /** Category to be displayed */
    category: categoryItemShape.isRequired,
    /** Set use of Link component */
    noRedirect: PropTypes.bool,
    /** Number of subcategory levels */
    subcategoryLevels: PropTypes.oneOf([0, 1, 2]),
    /** Defines the position of the category menu */
    menuPosition: PropTypes.oneOf(getMenuPositionValues()),
    /** Menu category selection */
    isCategorySelected: PropTypes.bool,
  }

  handleCloseMenu = () => this.setState({ isOnHover: false })

  renderCategory() {
    const { category: { name, slug }, noRedirect, isCategorySelected, menuDisposition } = this.props
    const { isHovered } = this.state

    console.log(name, slug)

    const categoryClasses = classNames(
      'w-100 pv5 no-underline t-small outline-0 db tc ttu link truncate bb bw1 c-muted-1', {
        'b--transparent': !isHovered && !isCategorySelected,
        'b--action-primary pointer': isHovered || isCategorySelected,
        'mr8': menuDisposition === categoryMenuDisposition.DISPLAY_LEFT.value,
        'ml8': menuDisposition === categoryMenuDisposition.DISPLAY_RIGHT.value,
        'mh6': menuDisposition === categoryMenuDisposition.DISPLAY_CENTER.value,
      }
    )

    return noRedirect ? (
      <span className={categoryClasses}>{name.toUpperCase()}</span>
    ) : (
      <Link
        onClick={this.handleCloseMenu}
        page="store.search#department"
        params={{ department: slug }}
        className={categoryClasses}
      >
        {name.toUpperCase()}
      </Link>
    )
  }

  paramsForChild = (child, parentSlug) => {
    const params = {
      department: parentSlug || child.slug,
    }
    if (parentSlug) params.category = child.slug
    return params
  }

  toSecondLevelChild(itemSlug, child, subCategory){  
    const { slug : parentSlug } = child
    const { slug } = subCategory
    
    const params = {
      department: itemSlug || parentSlug,
      category : itemSlug ? parentSlug : slug,
      ...(itemSlug && { subcategory: slug }),
    }
  
    return {...subCategory, params}
  }

  toItems(children, slug){
    return children.map(child => ({
      ...child,
      children: child.children && child.children.map(subCategory => this.toSecondLevelChild(slug, child, subCategory)),
      params: this.paramsForChild(child, slug),
    }))
  }

  render() {
    const { category : { children, slug, name }, isCategorySelected, menuDisposition, subcategoryLevels } = this.props
    const { isHovered } = this.state
    return (
      <li className={`${categoryMenu.itemContainer} flex items-center db list`}
        ref={e => { this.item = e }}
        onMouseEnter={() => this.setState({ isHovered: true })}
        onMouseLeave={() => this.setState({ isHovered: false })}
      >
        <ItemTitle
            onClick={this.handleCloseMenu}
            item={{name, params: { department: slug } }} 
            page={"store.search#department"}
            isSelected={isCategorySelected} 
            showBorder={isHovered || isCategorySelected}
            menuDisposition={menuDisposition}
        />
        {subcategoryLevels > 0 && (
          <ItemContainer
            menuDisposition={menuDisposition}
            containerRef={this.item}
            isShowing={isHovered}
            items={this.toItems(children, slug)}
            pageFirstLevel={slug ? 'store.search#category' : 'store.search#department'}
            pageSecondLevel={slug ? 'store.search#subcategory' : 'store.search#category' }
            onCloseMenu={this.handleCloseMenu}
            showSecondLevel={subcategoryLevels === 2}
          />
        )}
      </li>
    )
  }
}
