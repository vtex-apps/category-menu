import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { IconCaretLeft } from 'vtex.styleguide'
import SideBarItem from './SideBarItem'

export default class SideBar extends Component {
  static propTypes = {
    /** SideBar's title. */
    title: PropTypes.string,
    /** Sidebar's departments. */
    departments: PropTypes.arrayOf(PropTypes.object),
    /** Closes sidebar. */
    onClose: PropTypes.func,
  }

  static defaultProps = {
    title: 'Departments',
    departments: [],
    onClose: () => {},
  }

  componentDidMount() {
    document.body.classList.add('overflow-y-hidden')
  }

  componentWillUnmount() {
    document.body.classList.remove('overflow-y-hidden')
  }

  handleOutsideClick = () => {
    this.props.onClose()
  }

  render() {
    return (
      <Fragment>
        <div
          className="vtex-menu-sidebar__foreground fixed bg-near-black top-0 z-1 w-100 vh-100 o-40"
          onClick={() => this.props.onClose()}
        />
        <div className="vtex-menu-sidebar fixed bg-white vh-100 left-0 top-0 z-999">
          <div className="vtex-menu-sidebar__header flex justify-between items-center pa4 pl6 shadow-5 pointer"
            onClick={() => this.props.onClose()}
          >
            <span className="f4 fw5 dark-gray">{this.props.title}</span>
            <IconCaretLeft size={13} color="#585959" />
          </div>
          <div className="vtex-menu-sidebar__content shadow-5 overflow-y-auto">
            {this.props.departments.map(department => (
              <Fragment key={department.id}>
                <span className="flex bt w-90 b--light-gray center"></span>
                <SideBarItem
                  item={department}
                  linkValues={[department.slug]}
                  onClose={this.props.onClose}
                />
              </Fragment>
            ))}
          </div>
        </div>
      </Fragment>
    )
  }
}
