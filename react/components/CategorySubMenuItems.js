import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'render'

import { categoryPropType } from '../propTypes'

/**
 * Represents the sub-menu item list, which renders the categories and
 * a optional category title with a link
 */
export default class CategorySubMenuItems extends Component {
  static propTypes = {
    name: PropTypes.string,
    params: PropTypes.object,
    categories: PropTypes.arrayOf(categoryPropType).isRequired,
  }

  render() {
    const { name, params, categories } = this.props
    return (
      <div className="vtex-category-sub-menu__items-container">
        {name && (
          <Link
            page="store/category"
            className="vtex-category-sub-menu__items-title"
            params={params}
          >
            {name}
          </Link>
        )}
        <ul className="vtex-category-sub-menu__items list ma0 pa0 f6">
          {categories.map(category => (
            <li
              key={category.id}
              className="vtex-category-sub-menu__item lh-copy"
            >
              <Link
                page="store/category"
                params={{ ...params, category: category.slug }}
                className="no-underline underline-hover"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
