import React, { Component } from 'react'
import { Link } from 'render'
import PropTypes from 'prop-types'
import { categoryItemShape } from '../propTypes'

import ItemContainer from './ItemContainer'
import classNames from 'classnames'

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
  }

  render() {
    const { category } = this.props
    const { isHover } = this.state

    const containerStyle = {
      top: this.item && this.item.offsetTop + this.item.clientHeight,
      display: isHover ? 'flex' : 'none',
    }

    const linkClasses = classNames(
      'w-100 ph4 pt6 pb5 no-underline f6 outline-0 db tc truncate bb bw1 gray', {
        'b--transparent': !isHover,
        'b--heavy-blue': isHover,
      }
    )

    const itemClasses = 'vtex-category-menu__item flex justify-center items-center'

    return (
      <div className={itemClasses}
        ref={e => { this.item = e }}
        onMouseEnter={() => this.setState({ isHover: true })}
        onMouseLeave={() => this.setState({ isHover: false })}
      >
        {this.props.noRedirect ? (
          <a href="#" className={linkClasses}>
            {category.name.toUpperCase()}
          </a>
        ) : (
          <Link
            page="store/department"
            params={{ department: category.slug }}
            className={linkClasses}
          >
            {category.name.toUpperCase()}
          </Link>
        )}
        {category.children.length > 0 && (
          <div className="absolute w-100 left-0" style={containerStyle}>
            <ItemContainer categories={category.children} parentSlug={category.slug} />
          </div>
        )}
      </div>
    )
  }
}
