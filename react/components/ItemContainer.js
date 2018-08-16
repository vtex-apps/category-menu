import React, { Component, Fragment } from 'react'
import { Link } from 'render'
import { categoryPropType } from '../propTypes'

import PropTypes from 'prop-types'

/**
 * Component that represents an array of categories in the menu, also displays
 * the subcategories.
 */
export default class ItemContainer extends Component {
  static propTypes = {
    /** Category to be displayed */
    categories: PropTypes.arrayOf(categoryPropType),
    /** Department slug */
    parentSlug: PropTypes.string,
  }

  renderLinkFirstLevel(parentSlug, item) {
    return (
      <Link
        page={parentSlug ? 'store/category' : 'store/department'}
        className="vtex-category-menu__link-level-2 f5 fw5 no-underline pa4 outline-0 tl near-black"
        params={{
          department: parentSlug || item.slug,
          category: parentSlug ? item.slug : undefined,
        }}
      >
        {item.name.toUpperCase()}
      </Link>
    )
  }

  renderLinkSecondLevel(parentSlug, item, subItem) {
    return (
      <Link
        page={parentSlug ? 'store/subcategory' : 'store/category'}
        className="vtex-category-menu__link-level-3 black-60 pa4 ph5 no-underline outline-0 tl f6 near-black"
        params={{
          department: parentSlug || item.slug,
          category: parentSlug ? item.slug : subItem.slug,
          subcategory: parentSlug ? subItem.slug : undefined,
        }}
      >
        {subItem.name}
      </Link>
    )
  }

  render() {
    return (
      <div className="vtex-category-menu__item-container w-100 flex justify-center bg-white shadow-5 ph7 pv4">
        {this.props.categories.map(category => (
          <div key={category.id} className="fl flex flex-column pa4">
            {this.renderLinkFirstLevel(this.props.parentSlug, category)}
            {category.children && category.children.length > 0 && (
              <Fragment>
                <div className="bt b--black-10"></div>
                {category.children.map((subCategory, index) => (
                  <Fragment key={subCategory.id}>
                    {this.renderLinkSecondLevel(this.props.parentSlug, category, subCategory)}
                    {index !== category.children.length - 1 && (
                      <div className="bt b--black-10"></div>
                    )}
                  </Fragment>
                ))}
              </Fragment>
            )}
          </div>
        ))}
      </div>
    )
  }
}
