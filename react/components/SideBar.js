import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Animation } from 'vtex.store-components'
import { IconClose } from 'vtex.styleguide'
import SideBarItem from './SideBarItem'
import categoryMenu from '../categoryMenu.css'


const OPEN_SIDEBAR_CLASS = categoryMenu.sidebarOpen

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
    onClose: () => { },
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

    const scrimClasses = classNames(`${categoryMenu.sidebarScrim} fixed dim bg-base--inverted top-0 z-1 vw-100 vh-100 o-40`, {
      dn: !visible,
    })

    return (
      <Fragment>
        <div style={{ willChange: 'opacity' }} className={scrimClasses} onClick={this.props.onClose} />
        <Animation
          isActive={visible}
          type="drawerRight"
          className={`${categoryMenu.animation} fixed w-80 top-0 z-max`}
        >
          <div className={`${categoryMenu.sidebar} w-100 bg-base z-max vh-100 shadow-5 overflow-scroll`}>
            <div
              className={`${categoryMenu.sidebarHeader} flex justify-between items-center pa5 pointer`}
              onClick={onClose}
            >
              <IconClose size={24} color="#585959" />
            </div>
            <div className={`${categoryMenu.sidebarContent} overflow-y-auto`}>
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
