import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CategorySubMenuItems from './CategorySubMenuItems'
import { categoryPropType } from '../propTypes'

/**
 * Represents the category item sub-menu, responsible for rendering the
 * categories and it's own sub-categories
 */
export default class CategorySubMenu extends Component {
  static propTypes = {
    subCategories: PropTypes.arrayOf(categoryPropType).isRequired,
  }

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
