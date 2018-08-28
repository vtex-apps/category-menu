import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
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
    /** Runtime context. */
    runtime: PropTypes.shape({
      navigate: PropTypes.func,
    }),
    /** Tree level. */
    treeLevel: PropTypes.number,
  }

  static defaultProps = {
    treeLevel: 1
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
    const { item, linkValues, runtime, onClose, treeLevel } = this.props
    const hasChildren = item.children && item.children.length > 0
    const sideBarItemClasses = classNames(
      'vtex-menu-sidebar__item', {
        'bg-light-silver mid-gray fw3': treeLevel > 1,
        'near-black': treeLevel === 1
      }
    )
    const sideBarItemTitleClasses = classNames('', {
      'ml5' : treeLevel === 3,
      'ttu' : treeLevel === 1
    })
    return (
      <div className={sideBarItemClasses}>
        <div className="flex justify-between items-center pa4 pl6 pointer"
          onClick={this.handleItemClick}
        >
          <span className={sideBarItemTitleClasses}>
            {item.name}
          </span>
          {
            hasChildren && (
              <span className={treeLevel === 1 ? 'gray' : 'silver'}>
                {this.state.open
                  ? <IconCaretUp size={13} color={'currentcolor'}/>
                  : <IconCaretDown size={13} color={'currentcolor'}/>
                }
              </span>
            )
          }
        </div>
        {
          hasChildren && (
            <div className="bg-light-silver">
              {this.state.open && item.children.map(child => (
                <Fragment key={child.id}>
                  <span className="flex bt w-90 b--light-gray center"></span>
                  <SideBarItem
                    runtime={runtime}
                    item={child}
                    linkValues={[...linkValues, child.slug]}
                    onClose={onClose}
                    treeLevel={treeLevel + 1}
                  />
                </Fragment>
              ))}
            </div>
          )
        }
      </div>
    )
  }
}

export default withRuntimeContext(SideBarItem)
