import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import { Icon } from 'vtex.store-icons'

import { withRuntimeContext } from 'vtex.render-runtime'
import { IconMinus, IconPlus } from 'vtex.store-icons'

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
    treeLevel: 1,
  }

  state = {
    open: false,
  }

  get showSubCategories() {
    const {
      item: { children },
      showSubcategories,
    } = this.props
    return showSubcategories && children && children.length > 0
  }

  handleItemClick = () => {
    if (this.showSubCategories) {
      this.setState({ open: !this.state.open })
    } else {
      this.navigateToPage()
    }
  }

  navigateToPage() {
    const { onClose, linkValues, runtime } = this.props

    const [department, category, subcategory] = linkValues
    const params = { department }

    if (category) params.category = category
    if (subcategory) params.subcategory = subcategory

    const page = category
      ? subcategory
        ? 'store.search#subcategory'
        : 'store.search#category'
      : 'store.search#department'

    runtime.navigate({
      page,
      params,
      fallbackToWindowLocation: false,
    })
    onClose()
  }

  handleDepartmentClick = () => {
    const { runtime, onClose, linkValues } = this.props
    const [department] = linkValues
    const params = { department }
    const page = 'store.search#department'
    runtime.navigate({
      page,
      params,
      fallbackToWindowLocation: false,
    })
    onClose()
  }

  renderCategory() {
    const { item, treeLevel } = this.props
    const { open: isOpened } = this.state

    const sideBarContainerClasses = classNames(
      categoryMenu.sidebarItemContainer,
      'flex justify-between items-center pa5 pointer list ma0'
    )
    const sideBarItemTitleClasses = classNames('', {
      't-body lh-solid': treeLevel === 1,
    })

    const sideBarSpanClasses = classNames(
      treeLevel === 1 ? 'c-on-base' : 'c-muted-3'
    )

    return (
      <li className={sideBarContainerClasses} onClick={this.handleItemClick}>
        <span className={sideBarItemTitleClasses}>
          {item.icon && <Icon id={item.iconId} activeClassName="pr3" />}
          {item.name}
        </span>
        {this.showSubCategories && (
          <span className={sideBarSpanClasses}>
            {isOpened ? <IconMinus size={16} /> : <IconPlus size={16} />}
          </span>
        )}
      </li>
    )
  }

  renderChildren() {
    const {
      item: { children },
      runtime,
      linkValues,
      onClose,
      treeLevel,
      showSubcategories,
    } = this.props
    const { open } = this.state

    return (
      this.showSubCategories &&
      open && (
        <Fragment>
          <li
            className="pa5 pointer t-body c-muted-2 ma0 list"
            onClick={this.handleDepartmentClick}
          >
            <FormattedMessage id="category-menu.all-category.title">
              {txt => <span className="pl4">{txt}</span>}
            </FormattedMessage>
          </li>
          {children.map(child => (
            <li key={child.id} className="list ma0 pa0">
              <SideBarItem
                showSubcategories={showSubcategories}
                item={child}
                linkValues={[...linkValues, child.slug]}
                onClose={onClose}
                treeLevel={treeLevel + 1}
                runtime={runtime}
              />
            </li>
          ))}
        </Fragment>
      )
    )
  }

  render() {
    const { treeLevel } = this.props

    const sideBarItemClasses = classNames(
      `${categoryMenu.sidebarItem} list pa0 ma0`,
      {
        'c-muted-2 t-body pl4': treeLevel > 1,
        'c-on-base': treeLevel === 1,
      }
    )

    return (
      <ul className={sideBarItemClasses}>
        {this.renderCategory()}
        {this.renderChildren()}
      </ul>
    )
  }
}

export default withRuntimeContext(SideBarItem)
