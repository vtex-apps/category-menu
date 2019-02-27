import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Container } from 'vtex.store-components'

import { itemPropType } from '../propTypes'
import ChildLink from './ChildLink'
import categoryMenuPosition, {
  getMenuPositionValues,
} from '../utils/categoryMenuPosition'

import categoryMenu from '../categoryMenu.css'

/**
 * Component responsible for rendering an array of categories and its respective subcategories
 */
export default class ChildrenContainer extends Component {
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
    containerRef: PropTypes.object,
    /** Whether to show second level links or not */
    showSecondLevel: PropTypes.bool,
    /** Defines the position of the category menu */
    menuPosition: PropTypes.oneOf(getMenuPositionValues()),
    /** Custom styles to item container */
    containerStyle: PropTypes.object,
  }

  shouldRenderSecondLevel({ children }) {
    const { showSecondLevel } = this.props
    return children && !!children.length && showSecondLevel
  }

  render() {
    const {
      items,
      menuPosition,
      containerRef,
      isShowing,
      onCloseMenu,
    } = this.props

    const containerStyle = {
      top: containerRef && containerRef.offsetTop + containerRef.clientHeight,
    }

    const itemContainerClasses = classNames(`${categoryMenu.itemContainer} absolute w-100 left-0 bg-base pb2 bw1 bb b--muted-3`, {
      'flex': isShowing,
      'dn': !isShowing
    })

    const containerClasses = classNames('w-100 flex flex-wrap pa0 list mw9', {
      'justify-start': menuPosition === categoryMenuPosition.DISPLAY_LEFT.value,
      'justify-end': menuPosition === categoryMenuPosition.DISPLAY_RIGHT.value,
      'justify-center':
        menuPosition === categoryMenuPosition.DISPLAY_CENTER.value,
    })

    const columnItemClasses = classNames({
      'pl0 pr7': menuPosition === categoryMenuPosition.DISPLAY_LEFT.value,
      'pr0 pl7': menuPosition === categoryMenuPosition.DISPLAY_RIGHT.value,
    })

    const firstLevelLinkClasses = classNames(
      `${
        categoryMenu.firstLevelLink
      } db pv4 link no-underline outline-0 tl t-small truncate c-on-base underline-hover`,
      {
        pr4: menuPosition === categoryMenuPosition.DISPLAY_LEFT.value,
        pl4: menuPosition === categoryMenuPosition.DISPLAY_RIGHT.value,
        ph4: menuPosition === categoryMenuPosition.DISPLAY_CENTER.value,
      }
    )

    const secondLevelLinkClasses = classNames(
      `${
        categoryMenu.secondLevelLink
      } db pv3 no-underline outline-0 tl link t-small truncate c-muted-1 underline-hover`,
      {
        pr5: menuPosition === categoryMenuPosition.DISPLAY_LEFT.value,
        pl5: menuPosition === categoryMenuPosition.DISPLAY_RIGHT.value,
        ph5: menuPosition === categoryMenuPosition.DISPLAY_CENTER.value,
      }
    )

    return (
      items &&
      !!items.length && (
        <div
          className={itemContainerClasses}
          style={containerStyle}
        >
          <Container className="justify-center w-100 flex">
            <ul className={containerClasses}>
              {items.map(item => (
                <li key={item.name} className="dib">
                  <ul className={columnItemClasses}>
                    <ChildLink
                      item={item}
                      onClick={onCloseMenu}
                      className={firstLevelLinkClasses}
                    />
                    {this.shouldRenderSecondLevel(item) &&
                      item.children.map(subItem => (
                        <ChildLink
                          key={subItem.name}
                          item={subItem}
                          onClick={onCloseMenu}
                          className={secondLevelLinkClasses}
                        />
                      ))}
                  </ul>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      )
    )
  }
}
