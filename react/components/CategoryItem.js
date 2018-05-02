import React, { Component } from 'react'

import CategorySubMenu from './CategorySubMenu'
import { categoryPropType } from '../propTypes'

/**
 * Component that represents a single category displayed in the menu, also displays
 * the subcategories, if the provided category has them
 */
export default class CategoryItem extends Component {
  static propTypes = {
    /** Category to be displayed */
    category: categoryPropType.isRequired,
  }

  render() {
    const { category } = this.props

    const hasChildren = category.hasChildren || category.children.length > 0

    return (
      <div className="vtex-category-menu__item ph4" data-testid="category-item">
        <a href={category.href} className="db no-underline ttu">
          {category.name}
        </a>

        {hasChildren && <CategorySubMenu subCategories={category.children} />}
      </div>
    )
  }
}
