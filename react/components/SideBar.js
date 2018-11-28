import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Animation } from 'vtex.store-components'
import { IconClose } from 'vtex.styleguide'
import SideBarItem from './SideBarItem'

const OPEN_SIDEBAR_CLASS = 'vtex-menu-sidebar-open'

export default class SideBar extends Component {
  static propTypes = {
    /** SideBar's title. */
    title: PropTypes.string,
    /** Sidebar's departments. */
    departments: PropTypes.arrayOf(PropTypes.object),
    /** Closes sidebar. */
    onClose: PropTypes.func,
    /** Sidebar's visibility. */
    visible: PropTypes.bool,
    /** Whether to show subcategories or not */
    showSubcategories: PropTypes.bool,
  }

  static defaultProps = {
    title: 'Departments',
    departments: [],
    onClose: () => {},
  }

  updateComponent() {
    if (this.props.visible) {
      document.body.classList.add(OPEN_SIDEBAR_CLASS)
    } else {
      document.body.classList.remove(OPEN_SIDEBAR_CLASS)
    }
  }

  componentDidMount() {
    this.updateComponent()
  }

  componentDidUpdate() {
    this.updateComponent()
  }

  componentWillUnmount() {
    document.body.classList.remove(OPEN_SIDEBAR_CLASS)
  }

  handleOutsideClick = () => {
    this.props.onClose()
  }

  render() {
    const { visible, onClose, showSubcategories } = this.props

    const scrimClasses = classNames('vtex-menu-sidebar__scrim fixed dim bg-base--inverted top-0 z-1 w-100 vh-100 o-40', {
      dn: !visible,
    })

    return (
      <Fragment>
        <div style={{ willChange: 'opacity' }} className={scrimClasses} onClick={this.props.onClose} />
        <Animation
          isActive={visible}
          type="drawerRight"
          className="fixed w-80 left-0 top-0 z-max"
        >
          <div className="vtex-menu-sidebar w-100 bg-base vh-100">
            <div
              className="vtex-menu-sidebar__header flex justify-between items-center pa5 pointer"
              onClick={onClose}
            >
              <IconClose size={24} color="#585959" />
            </div>
            <div className="vtex-menu-sidebar__content shadow-5 overflow-y-auto">
              {this.props.departments.map(department => (
                <Fragment key={department.id}>
                  <span className="flex w-90 center"></span>
                  <SideBarItem
                    item={department}
                    linkValues={[department.slug]}
                    onClose={onClose}
                    showSubcategories={showSubcategories}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        </Animation>
      </Fragment>
    )
  }
}
