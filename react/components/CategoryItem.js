import React, { Component } from 'react'
import { Link, NoSSR } from 'vtex.render-runtime'
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
    isHover: false,
  }

  static propTypes = {
    /** Category to be displayed */
    category: categoryItemShape.isRequired,
    /** Set use of Link component */
    noRedirect: PropTypes.bool,
    /** Number of subcategory levels */
    subcategoryLevels: PropTypes.oneOf([0, 1, 2]),
  }

  handleCloseMenu = () => (this.setState({ isHover: false }))

  renderHeader(){
    const { category, noRedirect } = this.props
    const { isHover } = this.state

    const linkClasses = classNames(
      'w-100 pv5 mh6 no-underline t-small outline-0 db tc link truncate bb bw1 c-muted-1', {
        'b--transparent': !isHover,
        'b--action-primary': isHover,
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
    const { isHover } = this.state

    const containerStyle = {
      top: this.item && this.item.offsetTop + this.item.clientHeight,
      display: isHover ? 'flex' : 'none',
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
  
  get isOverflown(){
    return this.item.scrollHeight > this.item.clientHeight || this.item.scrollWidth > this.item.clientWidth;
  }

  render() {
    return (
      <li className={`${categoryMenu.container} flex items-center dib`}
        ref={e => { this.item = e }}
        onMouseEnter={() => this.setState({ isHover: true })}
        onMouseLeave={this.handleCloseMenu}
      >
        {this.renderHeader()}
        {this.renderChildren()}
      </li>
    )
  }
}
