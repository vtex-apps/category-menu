import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Animation } from 'vtex.store-components'
import { IconClose } from 'vtex.dreamstore-icons'
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
    onClose: () => {},
  }

  updateComponent() {
    console.log('test')
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
    const { visible, onClose, showSubcategories, departments } = this.props

    const scrimClasses = classNames(
      `${
        categoryMenu.sidebarScrim
      } fixed dim bg-base--inverted top-0 z-1 vw-100 vh-100 o-40`,
      {
        dn: !visible,
      }
    )

    return (
      <Fragment>
        <div className={scrimClasses} onClick={this.props.onClose} />
        <Animation
          isActive={visible}
          type="drawerRight"
          className={`${categoryMenu.animation} fixed w-80 top-0 z-max`}
        >
          <aside
            className={`${
              categoryMenu.sidebar
            } w-100 bg-base z-max vh-100 shadow-5 overflow-scroll`}
          >
            <div
              className={`${
                categoryMenu.sidebarHeader
              } flex justify-between items-center pa5 pointer`}
              onClick={onClose}
            >
              <IconClose size={24} activeClassName="c-muted-1" />
            </div>
            <ul className={`${categoryMenu.sidebarContent} pb7 list ma0 pa0`}>
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
}
