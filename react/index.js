import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { injectIntl, intlShape } from 'react-intl'
import Icon from 'vtex.use-svg/Icon'

import CategoryItem from './components/CategoryItem'
import SideBar from './components/SideBar'
import { categoryPropType } from './propTypes'
import getCategories from './queries/categoriesQuery.gql'

import categoryMenu from './categoryMenu.css'

const MAX_NUMBER_OF_MENUS = 6
const DEFAULT_SUBCATEGORIES_LEVELS = 1

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
    /** Whether to show subcategories or not */
    showSubcategories: PropTypes.bool,
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
    showSubcategories: true,
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
      showDepartmentsCategory,
      showSubcategories
    } = this.props
    const departments = this.departmentsSelected.length && this.departmentsSelected ||
      categories.slice(0, MAX_NUMBER_OF_MENUS)

    if (mobileMode) {
      return (
        <div className={`${categoryMenu.container} ${categoryMenu.mobile}`}>
          <SideBar
            visible={this.state.sideBarVisible}
            title={intl.formatMessage({ id: 'category-menu.departments.title' })}
            departments={categories}
            onClose={this.handleSidebarToggle}
            showSubcategories={showSubcategories} />
          <div className="flex pa4 pointer" onClick={this.handleSidebarToggle}>
            <Icon id="hpa-hamburguer-menu" size={20} />
          </div>
        </div>
      )
    }
    return (
      <navbar className={`${categoryMenu.container} bg-base dn flex-m justify-center`}>
        <div className="flex flex-wrap justify-center items-end t-action overflow-hidden">
          {showDepartmentsCategory && <CategoryItem noRedirect subcategoryLevels={DEFAULT_SUBCATEGORIES_LEVELS + showSubcategories} category={{
            children: categories,
            name: intl.formatMessage({ id: 'category-menu.departments.title' }),
          }} />}
          {departments.map(category => (
            <div key={category.id} className="flex items-center">
              <CategoryItem category={category} subcategoryLevels={DEFAULT_SUBCATEGORIES_LEVELS + showSubcategories} />
            </div>
          ))}
        </div>
      </navbar>
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
      default: CategoryMenu.defaultProps.showPromotionCategory,
    },
    showDepartmentsCategory: {
      type: 'boolean',
      title: 'editor.category-menu.show-departments-category.title',
      default: CategoryMenu.defaultProps.showDepartmentsCategory,
    },
    showSubcategories: {
      type: 'boolean',
      title: 'editor.category-menu.show-subcategories.title',
      default: CategoryMenu.defaultProps.showSubcategories,
    },
    showGiftCategory: {
      type: 'boolean',
      title: 'editor.category-menu.show-gift-category.title',
      default: CategoryMenu.defaultProps.showGiftCategory,
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
