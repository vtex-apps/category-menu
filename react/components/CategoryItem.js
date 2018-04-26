import React, { Component } from 'react'
import classNames from 'classnames'

import CategorySubMenu from './CategorySubMenu'
import { categoryPropType } from '../propTypes'

/**
 * Component that represents a single category displayed in the menu, also displays
 * the subcategories, if the provided category has them
 */
class CategoryItem extends Component {
  render() {
    const { category } = this.props

    const hasChildren = category.hasChildren || category.children.length > 0

    const wrapperClasses = classNames('vtex-category-menu__item h3 dib pl4', {
      'show-arrow pr6': hasChildren,
      pr4: !hasChildren,
    })

    return (
      <div className={wrapperClasses} data-testid="category-item">
        <a href={category.href} className="db mt6 no-underline ttu">
          {category.name}
        </a>

        {hasChildren && <CategorySubMenu subCategories={category.children} />}
      </div>
    )
  }
}

CategoryItem.propTypes = {
  /** Category to be displayed */
  category: categoryPropType.isRequired,
}

export default CategoryItem
