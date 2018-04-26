import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CategorySubMenuItems from './CategorySubMenuItems'
import { categoryPropType } from '../propTypes'

class CategorySubMenu extends Component {
  render() {
    return (
      <div
        className="vtex-category-sub-menu pa3 br2 br--bottom"
        data-testid="category-submenu"
      >
        {this.props.subCategories
          .filter(c => c.hasChildren)
          .map(category => (
            <CategorySubMenuItems
              key={category.id}
              name={category.name}
              href={category.href}
              categories={category.children}
            />
          ))}

        <CategorySubMenuItems
          categories={this.props.subCategories.filter(c => !c.hasChildren)}
        />
      </div>
    )
  }
}

CategorySubMenu.propTypes = {
  subCategories: PropTypes.arrayOf(categoryPropType).isRequired,
}

export default CategorySubMenu
