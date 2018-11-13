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
    /** Baner URL src */
    banner: PropTypes.string,
    /** Category to be displayed */
    categories: PropTypes.arrayOf(categoryPropType),
    /** Department slug */
    parentSlug: PropTypes.string,
    /** Close menu callback */
    onCloseMenu: PropTypes.func.isRequired,
    /** Whether to show second level links or not */
    showSecondLevel: PropTypes.bool,
  }

  renderLinkFirstLevel(parentSlug, item) {
    const params = {
      department: parentSlug || item.slug,
    }
    if (parentSlug) params.category = item.slug
    return (
      <Link
        onClick={this.props.onCloseMenu}
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
        onClick={this.props.onCloseMenu}
        page={parentSlug ? 'store/subcategory' : 'store/category'}
        className="vtex-category-menu__link-level-3 db pa3 ph5 no-underline outline-0 tl f7 truncate gray underline-hover"
        params={params}
      >
        {subItem.name}
      </Link>
    )
  }

  render() {
    const { banner, categories, parentSlug, showSecondLevel } = this.props
    return (
      <div className="vtex-category-menu__item-container w-100 bg-white pb2 overflow-y-auto bw1 bb b--light-gray">
        <div className="w-100 w-90-l w-80-xl center ph3-s ph7-m ph6-xl">
          {categories.map(category => (
            <div key={category.id} className="fl db pa2">
              {this.renderLinkFirstLevel(parentSlug, category)}
              {category.children && category.children.length > 0 && (
                <Fragment>
                  {showSecondLevel &&
                    category.children.map(subCategory => (
                      <Fragment key={subCategory.id}>
                        <span className="flex bt w-90 b--light-gray center" />
                        {this.renderLinkSecondLevel(parentSlug, category, subCategory)}
                      </Fragment>
                    ))}
                </Fragment>
              )}
            </div>
          ))}
        </div>
        {banner && (
          <div className="vtex-category-menu__banner">
            <img src={banner} />
          </div>
        )}
      </div>
    )
  }
}
