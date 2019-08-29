import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Animation } from 'vtex.store-components'
import { IconClose } from 'vtex.store-icons'

import SideBarItem from './SideBarItem'
import styles from '../categoryMenu.css'

const OPEN_SIDEBAR_CLASS = styles.sidebarOpen

const SideBar = ({
  title = 'Departments',
  visible,
  onClose = () => {},
  showSubcategories,
  departments = [],
}) => {
  useEffect(() => {
    if (visible) {
      document.body.classList.add(OPEN_SIDEBAR_CLASS)

      return () => document.body.classList.remove(OPEN_SIDEBAR_CLASS)
    } else {
      document.body.classList.remove(OPEN_SIDEBAR_CLASS)
    }
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
          <ul className={`${styles.sidebarContent} pb7 list ma0 pa0`}>
            {departments.map(department => (
              <li key={department.id} className="list ma0 pa0">
                <SideBarItem
                  item={department}
                  linkValues={[department.slug]}
                  onClose={onClose}
                  showSubcategories={showSubcategories}
                />
              </li>
            ))}
          </ul>
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
}

export default SideBar
