import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { categoryPropType } from '../propTypes'

class CategorySubMenu extends Component {
  render() {
    return (
      <div
        className="vtex-category-menu__sub-menu pa3 br2 br--bottom"
        data-testid="category-submenu"
      >
        <ul className="list ma0 pa0 f6">
          {this.props.subCategories.map(subCategory => (
            <li
              key={subCategory.id}
              className="vtex-category-menu__sub-item lh-copy"
            >
              <a
                className="no-underline underline-hover"
                href={subCategory.href}
              >
                {subCategory.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

CategorySubMenu.propTypes = {
  subCategories: PropTypes.arrayOf(categoryPropType).isRequired,
}

export default CategorySubMenu
