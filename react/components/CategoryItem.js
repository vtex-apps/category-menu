import React, { Component } from 'react'
import { Link } from 'vtex.render-runtime'
import PropTypes from 'prop-types'
import { categoryItemShape } from '../propTypes'

import ItemContainer from './ItemContainer'
import classNames from 'classnames'
import categoryMenu from '../categoryMenu.css'
import categoryMenuPosition, {
  getMenuPositionValues,
} from '../utils/categoryMenuPosition'

/**
 * Component that represents a single category displayed in the menu, also displays
 * the subcategories, if the provided category has them
 */
export default class CategoryItem extends Component {
  state = {
    isOnHover: false,
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
    const {
      category: { name, slug },
      noRedirect,
      isCategorySelected,
      menuPosition,
    } = this.props
    const { isOnHover } = this.state

    const categoryClasses = classNames(
      'w-100 pv5 no-underline t-small outline-0 db tc ttu link truncate bb bw1 c-muted-1',
      {
        'b--transparent': !isOnHover && !isCategorySelected,
        'b--action-primary pointer': isOnHover || isCategorySelected,
        mr8: menuPosition === categoryMenuPosition.DISPLAY_LEFT.value,
        ml8: menuPosition === categoryMenuPosition.DISPLAY_RIGHT.value,
        mh6: menuPosition === categoryMenuPosition.DISPLAY_CENTER.value,
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

  renderChildren() {
    const { category, subcategoryLevels, menuPosition } = this.props
    const { isOnHover } = this.state

    const containerStyle = {
      top: this.item && this.item.offsetTop + this.item.clientHeight,
      display: isOnHover ? 'flex' : 'none',
    }

    return (
      subcategoryLevels > 0 &&
      category.children.length > 0 && (
        <ItemContainer
          menuPosition={menuPosition}
          containerStyle={containerStyle}
          categories={category.children}
          parentSlug={category.slug}
          onCloseMenu={this.handleCloseMenu}
          showSecondLevel={subcategoryLevels === 2}
        />
      )
    )
  }

  render() {
    return (
      <li
        className={`${categoryMenu.itemContainer} flex items-center db list`}
        ref={e => {
          this.item = e
        }}
        onMouseEnter={() => this.setState({ isOnHover: true })}
        onMouseLeave={this.handleCloseMenu}
      >
        {this.renderCategory()}
        {this.renderChildren()}
      </li>
    )
  }
}
