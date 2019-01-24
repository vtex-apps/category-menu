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
    const { category, noRedirect } = this.props
    const { isOnHover } = this.state

    const linkClasses = classNames(
      'w-100 pv5 mh6 no-underline t-small outline-0 db tc link truncate bb bw1 c-muted-1', {
        'b--transparent': !isOnHover,
        'b--action-primary': isOnHover,
      }
    )

    return noRedirect ? (
      <a href="#" className={linkClasses}>
        {category.name.toUpperCase()}
      </a>
    ) : (
      <Link
        onClick={this.handleCloseMenu}
        page="store.search#department"
        params={{ department: category.slug }}
        className={linkClasses}
      >
        {category.name.toUpperCase()}
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
      <li className={`${categoryMenu.container, categoryMenu.list} flex items-center db list`}
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
