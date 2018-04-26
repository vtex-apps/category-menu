import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { categoryPropType } from '../propTypes'

class CategorySubMenuItems extends Component {
  render() {
    const { name, href, categories } = this.props

    return (
      <div className="vtex-category-sub-menu__items-container">
        {name && (
          <a className="vtex-category-sub-menu__items-title" href={href}>
            {name}
          </a>
        )}
        <ul className="vtex-category-sub-menu__items list ma0 pa0 f6">
          {categories.map(category => (
            <li
              key={category.id}
              className="vtex-category-sub-menu__item lh-copy"
            >
              <a href={category.href} className="no-underline underline-hover">
                {category.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

CategorySubMenuItems.propTypes = {
  name: PropTypes.string,
  href: PropTypes.string,
  categories: PropTypes.arrayOf(categoryPropType).isRequired,
}

export default CategorySubMenuItems
