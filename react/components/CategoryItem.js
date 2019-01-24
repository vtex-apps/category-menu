import React, { Component } from 'react'
import { Link } from 'vtex.render-runtime'
import PropTypes from 'prop-types'
import { categoryItemShape } from '../propTypes'

import ItemContainer from './ItemContainer'
import classNames from 'classnames'
import categoryMenu from '../categoryMenu.css'


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
  }

  handleCloseMenu = () => (this.setState({ isOnHover: false }))

  renderCategory(){
    const { category: { name, slug }, noRedirect } = this.props
    const { isOnHover } = this.state

    const categoryClasses = classNames(
      'w-100 pv5 mh6 no-underline t-small outline-0 db tc ttu link truncate bb bw1 c-muted-1', {
        'b--transparent': !isOnHover,
        'b--action-primary pointer': isOnHover,
      }
    )

    return noRedirect ? (
      <span className={categoryClasses}>
        {name.toUpperCase()}
      </span>
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

  renderChildren(){
    const { category, subcategoryLevels } = this.props
    const { isOnHover } = this.state

    const containerStyle = {
      top: this.item && this.item.offsetTop + this.item.clientHeight,
      display: isOnHover ? 'flex' : 'none',
    }

    return subcategoryLevels > 0 && category.children.length > 0 && (
      <ItemContainer
        containerStyle={containerStyle}
        categories={category.children}
        parentSlug={category.slug}
        onCloseMenu={this.handleCloseMenu}
        showSecondLevel={subcategoryLevels === 2}
      />
    )
  }
  
  render() {
    return (
      <li className={`${categoryMenu.container} flex items-center db list`}
        ref={e => { this.item = e }}
        onMouseEnter={() => this.setState({ isOnHover: true })}
        onMouseLeave={this.handleCloseMenu}
      >
        {this.renderCategory()}
        {this.renderChildren()}
      </li>
    )
  }
}
