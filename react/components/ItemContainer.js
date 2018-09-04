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
    const params = {
      department: parentSlug || item.slug,
    }
    if (parentSlug) params.category = item.slug
    return (
      <Link
        page={parentSlug ? 'store/category' : 'store/department'}
        className="vtex-category-menu__link-level-2 db f6 fw4 no-underline pa4 outline-0 tl truncate c-on-base underline-hover"
        params={params}
      >
        {item.name.toUpperCase()}
      </Link>
    )
  }

  renderLinkSecondLevel(parentSlug, item, subItem) {
    const params = {
      department: parentSlug || item.slug,
      category: parentSlug ? item.slug : subItem.slug,
    }
    if (parentSlug) params.subcategory = subItem.slug
    return (
      <Link
        page={parentSlug ? 'store/subcategory' : 'store/category'}
        className="vtex-category-menu__link-level-3 db pa3 ph5 no-underline outline-0 tl f7 truncate gray underline-hover"
        params={params}
      >
        {subItem.name}
      </Link>
    )
  }

  render() {
    
        
    return (
      <div className="vtex-category-menu__item-container w-100 bg-white pb2 overflow-y-auto">
        <div className="w-100 w-90-l w-80-xl center ph3-s ph7-m ph6-xl">
          {this.props.categories.map(category => (
            <div key={category.id} className="fl db pa2">
              {this.renderLinkFirstLevel(this.props.parentSlug, category)}
              {category.children && category.children.length > 0 && (
                <Fragment>
                  {category.children.map((subCategory) => (
                    <Fragment key={subCategory.id}>
                      <span className="flex bt w-90 b--light-gray center"></span>
                      {this.renderLinkSecondLevel(this.props.parentSlug, category, subCategory)}
                    </Fragment>
                  ))}
                </Fragment>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
