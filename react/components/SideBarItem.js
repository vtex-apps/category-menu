import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { IconCaretDown, IconCaretUp } from 'vtex.styleguide'
import { withRuntimeContext } from 'render'

class SideBarItem extends Component {
  static propTypes = {
    /** Sidebar's item. */
    item: PropTypes.object.isRequired,
    /** Link values to create the redirect. */
    linkValues: PropTypes.arrayOf(PropTypes.string).isRequired,
    /** Closes sidebar. */
    onClose: PropTypes.func.isRequired,
    runtime: PropTypes.shape({
      navigate: PropTypes.func,
    }),
  }

  state = {
    open: false,
  }

  handleItemClick = () => {
    if (this.props.item.children && this.props.item.children.length) {
      this.setState({ open: !this.state.open })
    } else {
      const [department, category, subcategory] = this.props.linkValues
      const page = category
        ? (subcategory ? 'store/subcategory' : 'store/category')
        : 'store/department'
      this.props.runtime.navigate({
        page,
        params: { department, category, subcategory },
        fallbackToWindowLocation: false,
      })
      this.props.onClose()
    }
  }

  render() {
    const { item, linkValues } = this.props
    const hasChildren = item.children && item.children.length > 0
    return (
      <div className="vtex-menu-sidebar__item">
        <div className="flex justify-between items-center pa4 pl6 pointer"
          onClick={this.handleItemClick}
        >
          <span>{item.name}</span>
          {
            hasChildren && (
              <span>
                {this.state.open
                  ? <IconCaretUp size={13} />
                  : <IconCaretDown size={13} />
                }
              </span>
            )
          }
        </div>
        {
          hasChildren &&
          this.state.open && item.children.map(child => (
            <Fragment key={child.id}>
              <span className="flex bt"></span>
              <SideBarItem
                item={child}
                linkValues={[...linkValues, child.slug]}
                onClose={this.props.onClose}
              />
            </Fragment>
          ))
        }
      </div>
    )
  }
}

export default withRuntimeContext(SideBarItem)
