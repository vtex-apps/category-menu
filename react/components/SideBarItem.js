import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'

import { Link, withRuntimeContext } from 'vtex.render-runtime'
import { IconMinus, IconPlus } from 'vtex.dreamstore-icons'

import categoryMenu from '../categoryMenu.css'

class SideBarItem extends Component {
  static propTypes = {
    /** Sidebar's item. */
    item: PropTypes.object.isRequired,
    /** Link values to create the redirect. */
    linkValues: PropTypes.arrayOf(PropTypes.string),
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
      this.navigate()
    }
  }

  navigate() {
    const { onClose, linkValues, runtime, item: { slug } } = this.props
    if (linkValues) {
      const [department, category, subcategory] = linkValues
      const params = {
        department,
        ...(category && { category: category }),
        ...(subcategory && { subcategory: subcategory }),
      }

      const page = category? 
        (subcategory ? 'store.search#subcategory' : 'store.search#category')
        : 'store.search#department'

      runtime.navigate({
        page,
        params,
        fallbackToWindowLocation: false,
      })
    } else {
      runtime.navigate({
        to: slug,
      })
    }
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
      <li
        className={sideBarContainerClasses}
        onClick={this.handleItemClick}
      >
        <span className={sideBarItemTitleClasses}>{item.name}</span>
        {this.showSubCategories && (
          <span className={sideBarSpanClasses}>
            {isOpened ? <IconMinus size={16} /> : <IconPlus size={16} />}
          </span>
        )}
      </li>
    )
  }

  getLinkAllProps = () => {
    const { linkValues, item: { slug } } = this.props
    if (!linkValues) {
      return {
        to: slug,
      }
    }
    const [department] = linkValues
    const params = { department }
    const page = 'store.search#department'
    return {
      page,
      params,
      fallbackToWindowLocation: false,
    }
  }

  renderChildren() {
    const {
      item: { children, slug, name},
      item,
      runtime,
      linkValues,
      onClose,
      treeLevel,
      showSubcategories,
    } = this.props
    const { open } = this.state
    
    return this.showSubCategories && open && (
      <Fragment>
        {(linkValues || slug) &&
          (<li className="pa5 pointer ma0 list"
            onClick={this.handleSeeAllClick}>
            <Link
              className="db link no-underline outline-0 tl t-small truncate c-muted-2"
              onClick={onClose}
              {...this.getLinkAllProps()}
            >
              {linkValues 
                ? <FormattedMessage id="category-menu.all-category.title" >
                    {txt => <span className="pl4">{txt}</span>}
                  </FormattedMessage>
                : <span className="pl4">{name}</span>
              }
            </Link>
          </li>)
        }
        {children.map(child => (
          <li key={child.id} className="list ma0 pa0">
            <SideBarItem
              showSubcategories={showSubcategories}
              item={child}
              linkValues={linkValues && [...linkValues, child.slug]}
              onClose={onClose}
              treeLevel={treeLevel + 1}
              runtime={runtime}
            />
          </li>
        ))}
      </Fragment>
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
