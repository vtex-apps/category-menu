import React, { Component } from 'react'
import { Link } from 'vtex.render-runtime'
import { itemPropType } from '../propTypes'
import classNames from 'classnames'
import { Container } from 'vtex.store-components'

import PropTypes from 'prop-types'
import categoryMenu from '../categoryMenu.css'
import categoryMenuPosition, { getMenuPositionValues } from '../utils/categoryMenuPosition'

/**
 * Component responsible dor rendering an array of categories and its respective subcategories
 */
export default class ItemContainer extends Component {
  static propTypes = {
    /** Category to be displayed */
    items: PropTypes.arrayOf(itemPropType).isRequired,
    /** Department slug */
    parentSlug: PropTypes.string,
    /** Close menu callback */
    onCloseMenu: PropTypes.func.isRequired,
    /** Whether to show second level links or not */
    showSecondLevel: PropTypes.bool,
    /** Defines the position of the category menu */
    menuPosition: PropTypes.oneOf(getMenuPositionValues()),
    /** Custom styles to item container */
    containerStyle: PropTypes.object,
    /** Page to be used in first level. If your item is a search, this variable must be defined so as the param in each one of the items. Otherwise each item must have a slug */
    pageFirstLevel: PropTypes.string,
    /** Page to be used in second level. If your item is a search, this variable must be defined so as the param in each one of the items. Otherwise each item must have a slug */
    pageSecondLevel: PropTypes.string,
  }

  renderLinkFirstLevel({ name, params, slug }) {
    const { pageFirstLevel, onCloseMenu } = this.props

    return (
      <li className="list pa0">
        <Link
          onClick={onCloseMenu}
          page={pageFirstLevel}
          to={pageFirstLevel ? undefined : slug}
          className={`${categoryMenu.linkLevel2} db link no-underline pa4 outline-0 tl t-small truncate c-on-base underline-hover`}
          params={params}
        >
          {name.toUpperCase()}
        </Link>
      </li>
    )
  }

  renderLinkSecondLevel(subItem) {
    const { onCloseMenu, pageSecondLevel } = this.props

    return (
      <li key={subItem.id} className="list pa0">
        <Link
          onClick={onCloseMenu}
          page={pageSecondLevel}
          to={pageSecondLevel ? undefined : subItem.slug}
          className={`${categoryMenu.linkLevel3} db pa3 ph5 no-underline outline-0 tl link t-small truncate c-muted-1 underline-hover`}
          params={subItem.params}
        >
          {subItem.name.toUpperCase()}
        </Link>
      </li>
    )
  }

  shouldRenderSecondLevel({ children }) {
    const { showSecondLevel } = this.props

    return children && children.length > 0 && showSecondLevel
  }

  renderChildren(item) {
    return this.shouldRenderSecondLevel(item) && item.children.map(subItem =>
      this.renderLinkSecondLevel(subItem)
    )
  }

  render() {
    const { containerStyle, items, menuDisposition } = this.props

    const containerClasses = classNames('w-100 flex flex-wrap pa0 list mw9', {
      'justify-start': menuPosition === categoryMenuPosition.DISPLAY_LEFT.value,
      'justify-end': menuPosition === categoryMenuPosition.DISPLAY_RIGHT.value,
      'justify-center': menuPosition === categoryMenuPosition.DISPLAY_CENTER.value,
    })

    const columnItemClasses = classNames({
      'pl0 pr7': menuPosition === categoryMenuPosition.DISPLAY_LEFT.value,
      'pr0 pl7': menuPosition === categoryMenuPosition.DISPLAY_RIGHT.value,
    })

    return (
      <div className={`${categoryMenu.itemContainer} absolute w-100 left-0 bg-base pb2 bw1 bb b--muted-3`} style={containerStyle}>
        <Container className="justify-center w-100 flex">
          <ul className={containerClasses}>
            {items.map(item => (
              <li key={item.id} className="dib pa2">
                <ul className={columnItemClasses}>
                  {this.renderLinkFirstLevel(item)}
                  {this.renderChildren(item)}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    )
  }
}
