import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

/**
 * Component that represents a single category displayed in the menu, also displays
 * the subcategories, if the provided category has them
 */
class CategoryItem extends Component {
  render() {
    const { category } = this.props

    const hasChildren = category.hasChildren || category.children.length > 0

    const wrapperClasses = classNames(
      'h3 w4 category-menu__item dib pl5 pr4 black-90 hover-bg-black-90 hover-white',
      {
        'show-arrow': hasChildren,
      }
    )

    return (
      <div className={wrapperClasses} data-testid="category-item">
        <a href={category.href} className="db mt6 no-underline ttu">
          {category.name}
        </a>

        {hasChildren && (
          <div
            className="category-menu__sub-menu pv6 ph5 br2 br--bottom"
            data-testid="category-submenu"
          >
            <ul className="list ma0 pa0 f6">
              {category.children.map(subCategory => (
                <li
                  key={subCategory.id}
                  className="lh-copy category-menu__sub-item"
                >
                  <a
                    className="near-black no-underline underline-hover"
                    href={subCategory.href}
                  >
                    {subCategory.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

CategoryItem.propTypes = {
  /** Category to be displayed */
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    hasChildren: PropTypes.bool.isRequired,
  }).isRequired,
}

export default CategoryItem
