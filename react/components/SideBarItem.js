import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withRuntimeContext } from 'render'
import { FormattedMessage } from 'react-intl'

import Icon from 'vtex.use-svg/Icon'
import categoryMenu from '../categoryMenu.css'



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
    /** Whether to show subcategories or not */
    showSubcategories: PropTypes.bool,
  }

  static defaultProps = {
    treeLevel: 1
  }

  state = {
    open: false,
  }

  handleItemClick = () => {
    const { item: { children }, runtime, onClose, linkValues, showSubcategories } = this.props
    if (showSubcategories && children && children.length) {
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

  handleDepartmentClick = () => {
    const { runtime, onClose, linkValues } = this.props
    const [department] = linkValues
    const params = { department }
    const page = 'store/department'
    runtime.navigate({
      page,
      params,
      fallbackToWindowLocation: false,
    })
    onClose()
  }

  render() {
    const { item, linkValues, runtime, onClose, treeLevel, showSubcategories } = this.props
    const hasChildren = showSubcategories && item.children && item.children.length > 0
    const sideBarItemClasses = classNames(
      categoryMenu.sidebarItem, {
        'c-muted-2 pl4 t-body': treeLevel > 1,
        'c-on-base': treeLevel === 1
      }
    )
    const sideBarItemTitleClasses = classNames('', {
      'ml5': treeLevel === 3,
      't-heading-4 lh-solid': treeLevel === 1
    })
    return (
      <div className={sideBarItemClasses}>
        <div className="flex justify-between items-center pa5 pl5 pointer"
          onClick={this.handleItemClick}
        >
          <span className={sideBarItemTitleClasses}>
            {item.name}
          </span>
          {
            hasChildren && (
              <span className={treeLevel === 1 ? 'c-on-base' : 'c-muted-3'}>
                {this.state.open
                  ? <Icon id="nav-minus" size={16} />
                  : <Icon id="nav-plus" size={16} />
                }
              </span>
            )
          }
        </div>
        {
          hasChildren && this.state.open && (
            <Fragment>
              <div className={`${categoryMenu.sidebarItem} c-on-muted-3`}>
                <div className="flex justify-between items-center pa5 pl5 pointer t-body"
                  onClick={this.handleDepartmentClick}>
                  <div className="pl4 c-muted-2">
                    <FormattedMessage id="category-menu.all-category.title" />
                  </div>
                </div>
              </div>
              {item.children.map(child => (
                <Fragment key={child.id}>
                  <span className="flex w-90 center"></span>
                  <SideBarItem
                    runtime={runtime}
                    item={child}
                    linkValues={[...linkValues, child.slug]}
                    onClose={onClose}
                    treeLevel={treeLevel + 1}
                  />
                </Fragment>))}
            </Fragment>
          )
        }
      </div>
    )
  }
}

export default withRuntimeContext(SideBarItem)
