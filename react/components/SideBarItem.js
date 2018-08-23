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
    const { item: { children }, runtime, onClose, linkValues } = this.props
    if (children && children.length) {
      this.setState({ open: !this.state.open })
    } else {
      const [department, category, subcategory] = linkValues
      const params = { department }
      if (category) params.category = category
      if (subcategory) params.subcategory = subcategory
      const page = category
        ? (subcategory ? 'store/subcategory' : 'store/category')
        : 'store/department'
      runtime.navigate({
        page,
        params,
        fallbackToWindowLocation: false,
      })
      onClose()
    }
  }

  render() {
    const { item, linkValues, runtime, onClose } = this.props
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
                runtime={runtime}
                item={child}
                linkValues={[...linkValues, child.slug]}
                onClose={onClose}
              />
            </Fragment>
          ))
        }
      </div>
    )
  }
}

export default withRuntimeContext(SideBarItem)
