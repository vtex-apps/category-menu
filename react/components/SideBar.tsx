import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Animation } from 'vtex.store-components'
import { IconClose } from 'vtex.store-icons'
import { ExtensionPoint } from 'vtex.render-runtime'
import _noop from 'lodash/noop'

import Explorer from './Explorer'
import Accordeon from './Accordeon'
import styles from '../categoryMenu.css'
import { MOBILE_DISPLAY_TYPE } from '../utils/constants'

const OPEN_SIDEBAR_CLASS = styles.sidebarOpen

const SideBar = ({
  visible,
  onClose = () => {},
  showSubcategories,
  departments = [],
  mobileDisplayType,
}) => {
  useEffect(() => {
    if (visible) {
      document.body.classList.add(OPEN_SIDEBAR_CLASS)

      return () => document.body.classList.remove(OPEN_SIDEBAR_CLASS)
    }

    document.body.classList.remove(OPEN_SIDEBAR_CLASS)

    return _noop
  }, [visible])

  const scrimClasses = classNames(
    styles.sidebarScrim,
    'fixed dim bg-base--inverted top-0 z-1 vw-100 vh-100 o-40',
    {
      dn: !visible,
    }
  )

  return (
    <Fragment>
      <div className={scrimClasses} onClick={onClose} />
      <Animation
        isActive={visible}
        type="drawerRight"
        className={`${styles.animation} fixed w-80 top-0 z-max`}
      >
        <aside
          className={`${styles.sidebar} w-100 bg-base z-max vh-100 shadow-5 overflow-scroll`}
        >
          <div
            className={`${styles.sidebarHeader} flex justify-between items-center pa5 pointer`}
            onClick={onClose}
          >
            <IconClose size={24} activeClassName="c-muted-1" />
          </div>
          <ExtensionPoint id="before-menu" />
          {mobileDisplayType === MOBILE_DISPLAY_TYPE.EXPLORER ? (
            <Explorer
              styles={styles}
              departments={departments}
              onClose={onClose}
            />
          ) : (
            <Accordeon
              styles={styles}
              departments={departments}
              onClose={onClose}
              showSubcategories={showSubcategories}
            />
          )}
          <ExtensionPoint id="after-menu" />
        </aside>
      </Animation>
    </Fragment>
  )
}

SideBar.propTypes = {
  /** Sidebar's departments. */
  departments: PropTypes.arrayOf(PropTypes.object),
  /** Closes sidebar. */
  onClose: PropTypes.func,
  /** Sidebar's visibility. */
  visible: PropTypes.bool,
  /** Whether to show subcategories or not */
  showSubcategories: PropTypes.bool,
  /** Mobile display type */
  mobileDisplayType: PropTypes.string,
}

export default SideBar
