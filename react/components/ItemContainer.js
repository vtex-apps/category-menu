import React, { Component } from 'react'
import { Link } from 'vtex.render-runtime'
import { categoryPropType } from '../propTypes'
import classNames from 'classnames'
import { Container } from 'vtex.store-components'

import PropTypes from 'prop-types'
import categoryMenu from '../categoryMenu.css'
import categoryMenuDisposition from '../utils/categoryMenuDisposition' 

/**
 * Component responsible dor rendering an array of categories and its respective subcategories
 */
export default class ItemContainer extends Component {
  static propTypes = {
    /** Category to be displayed */
    categories: PropTypes.arrayOf(categoryPropType),
    /** Department slug */
    parentSlug: PropTypes.string,
    /** Close menu callback */
    onCloseMenu: PropTypes.func.isRequired,
    /** Whether to show second level links or not */
    showSecondLevel: PropTypes.bool,

    /** Custom styles to item container */
    containerStyle: PropTypes.object,
  }

  renderLinkFirstLevel(parentSlug, item) {
    const params = {
      department: parentSlug || item.slug,
    }
    if (parentSlug) params.category = item.slug
    return (
      <li className="list pa0">
        <Link
          onClick={this.props.onCloseMenu}
          page={parentSlug ? 'store.search#category' : 'store.search#department'}
          className={`${categoryMenu.linkLevel2} db link no-underline pa4 outline-0 tl t-small truncate c-on-base underline-hover`}
          params={params}
        >
          {item.name.toUpperCase()}
        </Link>
      </li>
    )
  }

  renderLinkSecondLevel(parentSlug, item, subItem) {
    const { onCloseMenu } = this.props

    const params = {
      department: parentSlug || item.slug,
      category: parentSlug ? item.slug : subItem.slug,
    }
    if (parentSlug) params.subcategory = subItem.slug
    return (
      <li key={subItem.id} className="list pa0">
        <Link
          onClick={onCloseMenu}
          page={parentSlug ? 'store.search#subcategory' : 'store.search#category'}
          className={`${categoryMenu.linkLevel3} db pa3 ph5 no-underline outline-0 tl link t-small truncate c-muted-1 underline-hover`}
          params={params}
        >
          {subItem.name}
        </Link>
      </li>
    )
  }

  shouldRenderSecondLevel(category) {
    const { children } = category
    const { showSecondLevel } = this.props

    return children && children.length > 0 && showSecondLevel
  }

  renderChildren(category) {
    const { parentSlug } = this.props
    return this.shouldRenderSecondLevel(category) && category.children.map(subCategory =>
      this.renderLinkSecondLevel(parentSlug, category, subCategory)
    )
  }

  render() {
    const { containerStyle, categories, parentSlug, menuDisposition } = this.props

    const containerClasses = classNames('w-100 flex flex-wrap pa0 list mw9', {
      'justify-start': menuDisposition === categoryMenuDisposition.DISPLAY_LEFT.value,
      'justify-end': menuDisposition === categoryMenuDisposition.DISPLAY_RIGHT.value,
      'justify-center': menuDisposition === categoryMenuDisposition.DISPLAY_CENTER.value,
    })

    const columnItemClasses = classNames({
      'pl0 pr7': menuDisposition === categoryMenuDisposition.DISPLAY_LEFT.value,
      'pr0 pl7': menuDisposition === categoryMenuDisposition.DISPLAY_RIGHT.value,
    }) 

    return (
      <div className={`${categoryMenu.itemContainer} absolute w-100 left-0 bg-base pb2 bw1 bb b--muted-3`} style={containerStyle}>
        <Container className="justify-center w-100 flex">
          <ul className={containerClasses}>
            {categories.map(category => (
              <li key={category.id} className="dib pa2">
                <ul className={columnItemClasses}>
                  {this.renderLinkFirstLevel(parentSlug, category)}
                  {this.renderChildren(category)}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    )
  }
}
