import React, { Component } from 'react'
import { Link } from 'vtex.render-runtime'
import { itemPropType } from '../propTypes'
import classNames from 'classnames'
import { Container } from 'vtex.store-components'

import PropTypes from 'prop-types'
import categoryMenu from '../categoryMenu.css'
import categoryMenuDisposition, { getMenuDispositionValues } from '../utils/categoryMenuDisposition'

/**
 * Component responsible dor rendering an array of categories and its respective subcategories
 */
export default class ChilrenContainer extends Component {
  static propTypes = {
    /** Category to be displayed */
    items: PropTypes.arrayOf(itemPropType).isRequired,
    /** Department slug */
    parentSlug: PropTypes.string,
    /** Close menu callback */
    onCloseMenu: PropTypes.func.isRequired,
    /** Indicates if the children must be shown */
    isShowing: PropTypes.bool,
    /** Ref to the parent container. Used to position the children below it */
    containerRef: PropTypes.elementType,
    /** Whether to show second level links or not */
    showSecondLevel: PropTypes.bool,
    /** Defines the disposition of the category menu */
    menuDisposition: PropTypes.oneOf(getMenuDispositionValues()),
    /** Custom styles to item container */
    containerStyle: PropTypes.object,
    /** Page to be used in first level items. If your item is a search, this variable must be defined so as the param in each one of the items.
     *  Otherwise each item must have a slug that describe the item path relative to the host. */
    pageFirstLevel: PropTypes.string,
    /** Page to be used in second level items. If your item is a search, this variable must be defined so as the param in each one of the items.
     *  Otherwise each item must have a slug that describe the item path relative to the host. */
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

  renderLinkSecondLevel({ name, params, slug }) {
    const { onCloseMenu, pageSecondLevel } = this.props

    return (
      <li key={name} className="list pa0">
        <Link
          onClick={onCloseMenu}
          page={pageSecondLevel}
          to={pageSecondLevel ? undefined : slug}
          className={`${categoryMenu.linkLevel3} db pa3 ph5 no-underline outline-0 tl link t-small truncate c-muted-1 underline-hover`}
          params={params}
        >
          {name.toUpperCase()}
        </Link>
      </li>
    )
  }

  shouldRenderSecondLevel({ children }) {
    const { showSecondLevel } = this.props
    return children && !!children.length && showSecondLevel
  }

  renderChildren(item) {
    return this.shouldRenderSecondLevel(item) && item.children.map(subItem =>
      this.renderLinkSecondLevel(subItem)
    )
  }

  render() {
    const { items, menuDisposition, containerRef, isShowing } = this.props

    const containerStyle = {
      top: containerRef && containerRef.offsetTop + containerRef.clientHeight,
      display: isShowing ? 'flex' : 'none',
    }

    const containerClasses = classNames('w-100 flex flex-wrap pa0 list mw9', {
      'justify-start': menuDisposition === categoryMenuDisposition.DISPLAY_LEFT.value,
      'justify-end': menuDisposition === categoryMenuDisposition.DISPLAY_RIGHT.value,
      'justify-center': menuDisposition === categoryMenuDisposition.DISPLAY_CENTER.value,
    })

    const columnItemClasses = classNames({
      'pl0 pr7': menuDisposition === categoryMenuDisposition.DISPLAY_LEFT.value,
      'pr0 pl7': menuDisposition === categoryMenuDisposition.DISPLAY_RIGHT.value,
    })

    return items && !!items.length && (
      <div className={`${categoryMenu.itemContainer} absolute w-100 left-0 bg-base pb2 bw1 bb b--muted-3`} style={containerStyle}>
        <Container className="justify-center w-100 flex">
          <ul className={containerClasses}>
            {items.map(item => (
              <li key={item.name} className="dib pa2">
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
