import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { injectIntl, intlShape } from 'react-intl'

import CategoryItem from './components/CategoryItem'
import SideBar from './components/SideBar'
import HamburguerIcon from './images/HamburguerIcon'
import { categoryPropType } from './propTypes'
import getCategories from './queries/categoriesQuery.gql'

import './global.css'

const MAX_NUMBER_OF_MENUS = 6

/**
 * Component that represents the menu containing the categories of the store
 */
class CategoryMenu extends Component {
  static propTypes = {
    /** Whether to show the promotion category or not */
    showPromotionCategory: PropTypes.bool,
    /** Whether to show the gift category or not */
    showGiftCategory: PropTypes.bool,
    /** Categories query data */
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      categories: PropTypes.arrayOf(categoryPropType),
    }),
    /** Set mobile mode */
    mobileMode: PropTypes.bool,
    /** Whether to show the departments category or not */
    showDepartmentsCategory: PropTypes.bool,
    /** Intl */
    intl: intlShape,
    /** Departments to be shown in the desktop mode. */
    departments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
    })),
  }

  static defaultProps = {
    showPromotionCategory: false,
    showGiftCategory: false,
    mobileMode: false,
    showDepartmentsCategory: true,
    departments: [],
  }

  state = {
    sideBarVisible: false,
  }

  handleSidebarToggle = () => {
    this.setState({ sideBarVisible: !this.state.sideBarVisible })
  }

  get departmentsSelected() {
    const { data: { categories = [] }, departments } = this.props
    const departmentsIds = departments.map(dept => dept.id)
    return categories.filter(category => departmentsIds.includes(category.id))
  }

  render() {
    const {
      data: { categories = [] },
      intl,
      mobileMode,
      showDepartmentsCategory
    } = this.props
    const departments = this.departmentsSelected.length && this.departmentsSelected ||
      categories.slice(0, MAX_NUMBER_OF_MENUS)

    if (mobileMode) {
      return (
        <div className="vtex-category-menu vtex-category-menu--mobile">
          <SideBar
            visible={this.state.sideBarVisible}
            title={intl.formatMessage({ id: 'category-menu.departments.title' })}
            departments={categories}
            onClose={this.handleSidebarToggle} />
          <div className="flex pa4 pointer" onClick={this.handleSidebarToggle}>
            <HamburguerIcon />
          </div>
        </div>
      )
    }
    return (
      <div className="vtex-category-menu bg-white dn flex-m justify-center">
        <div className="vtex-category-menu__container flex flex-wrap justify-center items-end f6 overflow-hidden">
          {showDepartmentsCategory && <CategoryItem noRedirect category={{
            children: categories,
            name: intl.formatMessage({ id: 'category-menu.departments.title' }),
          }} />}
          {departments.map(category => (
            <div key={category.id} className="flex items-center">
              <CategoryItem category={category} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export const CategoryMenuWithIntl = injectIntl(CategoryMenu)

CategoryMenuWithIntl.schema = CategoryMenu.schema = {
  title: 'editor.category-menu.title',
  description: 'editor.category-menu.description',
  type: 'object',
  properties: {
    showPromotionCategory: {
      type: 'boolean',
      title: 'editor.category-menu.show-promotion-category.title',
    },
    showDepartmentsCategory: {
      type: 'boolean',
      title: 'editor.category-menu.show-departments-category.title',
    },
    showGiftCategory: {
      type: 'boolean',
      title: 'editor.category-menu.show-gift-category.title',
    },
    departments: {
      title: 'category-menu.departments.title',
      type: 'array',
      minItems: 0,
      maxItems: MAX_NUMBER_OF_MENUS,
      items: {
        title: 'editor.category-menu.departments.items.title',
        type: 'object',
        properties: {
          id: {
            title: 'editor.category-menu.departments.items.id',
            type: 'number',
          },
        },
      },
    },
  },
}

export default graphql(getCategories)(CategoryMenuWithIntl)
