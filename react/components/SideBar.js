import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { IconCaretLeft } from 'vtex.styleguide'
import SideBarItem from './SideBarItem'

export default class SideBar extends Component {
  static propTypes = {
    /** Sidebar's departments. */
    departments: PropTypes.arrayOf(PropTypes.object),
    /** Closes sidebar. */
    onClose: PropTypes.func,
  }

  static defaultProps = {
    departments: [],
    onClose: () => {},
  }

  componentDidMount() {
    document.body.classList.add('vtex-category-menu--open')
  }

  componentWillUnmount() {
    document.body.classList.remove('vtex-category-menu--open')
  }

  handleOutsideClick = () => {
    this.props.onClose()
  }

  render() {
    return (
      <Fragment>
        <div
          className="vtex-menu-sidebar__foreground fixed bg-near-black top-0 z-1 w-100 o-40"
          onClick={() => this.props.onClose()}
        />
        <div className="vtex-menu-sidebar fixed bg-white left-0 top-0 z-999">
          <div className="vtex-menu-sidebar__header flex justify-between items-center pa4 pl6 shadow-5 pointer"
            onClick={() => this.props.onClose()}
          >
            <span className="fw5">DEPARTAMENTOS</span>
            <IconCaretLeft size={13} color="#585959" />
          </div>
          <div className="vtex-menu-sidebar__content h-100 shadow-5">
            {this.props.departments.map(department => (
              <Fragment key={department.id}>
                <span className="flex bt"></span>
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
