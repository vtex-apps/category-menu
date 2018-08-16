import React, { Component } from 'react'
import { Link } from 'render'
import PropTypes from 'prop-types'
import { categoryItemPropType } from '../propTypes'

import ItemContainer from './ItemContainer'

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
    category: categoryItemPropType.isRequired,
    /** Set use of Link component */
    noRedirect: PropTypes.bool,
    /** Item's width percent */
    widthPercent: PropTypes.number,
  }

  render() {
    const { category, widthPercent } = this.props

    const containerStyle = {
      top: this.item && this.item.offsetTop + this.item.clientHeight,
      display: this.state.isHover ? 'flex' : 'none',
    }

    const linkClasses = 'w-100 h-100 no-underline flex justify-center items-center f6 outline-0'

    return (
      <div className="vtex-category-menu__item h-100 flex justify-center items-center"
        ref={e => { this.item = e }}
        onMouseEnter={() => this.setState({ isHover: true })}
        onMouseLeave={() => this.setState({ isHover: false })}
        style={{ width: `${widthPercent}%` }}
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
            <ItemContainer categories={category.children} />
          </div>
        )}
      </div>
    )
  }
}
