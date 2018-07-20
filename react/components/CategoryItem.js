import React, { Component } from 'react'
import { Link } from 'render'
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

    const hasChildren = !!(
      category.hasChildren ||
      (category.children && category.children.length > 0)
    )

    if (hasChildren) {
      const scrollHeight = document.getElementById('vtex-category-menu-nav')
        ? document.getElementById('vtex-category-menu-nav').scrollLeft - 50
        : 0
    }

    return (
      <div className="vtex-category-menu__item ph4" data-testid="category-item">
        <Link
          page="store/department"
          params={{ department: category.slug }}
          className="db no-underline ttu"
        >
          {category.name}
        </Link>

        {hasChildren && <CategorySubMenu
          params={{ department: category.slug }}
          subCategories={category.children} />}
      </div>
    )
  }
}
