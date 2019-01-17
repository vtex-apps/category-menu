import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import { injectIntl, intlShape } from 'react-intl'
import { IconMenu } from 'vtex.dreamstore-icons'

import CategoryItem from './components/CategoryItem'
import SideBar from './components/SideBar'
import { categoryPropType } from './propTypes'
import getCategories from './queries/categoriesQuery.gql'

import categoryMenu from './categoryMenu.css'

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

  get departments() {
    const { data: { categories = [] }, departments } = this.props
    const departmentsIds = departments.map(dept => dept.id)
    const departmentsSelected = categories.filter(category => departmentsIds.includes(category.id))
    return (this.departmentsSelected && departmentsSelected.length) || categories
  }

  renderSideBar(){
    const {
      data: { categories = [] },
      intl,
      showSubcategories
    } = this.props
    const { sideBarVisible } = this.state

    return (
      <div className={`${categoryMenu.container} ${categoryMenu.mobile}`}>
        <SideBar
          visible={sideBarVisible}
          title={intl.formatMessage({ id: 'category-menu.departments.title' })}
          departments={categories}
          onClose={this.handleSidebarToggle}
          showSubcategories={showSubcategories} />
        <div className="flex pa4 pointer" onClick={this.handleSidebarToggle}>
          <IconMenu size={20} />
        </div>
      </div>
    )
  }

  renderMenu(){
    const {
      data: { categories = [] },
      intl,
      showDepartmentsCategory,
      showSubcategories
    } = this.props

    return (
      <nav className={`${categoryMenu.container} bg-base dn flex-m justify-center`}>
        <ul className="flex flex-wrap justify-center t-action overflow-hidden">
            {showDepartmentsCategory && 
              <CategoryItem noRedirect subcategoryLevels={DEFAULT_SUBCATEGORIES_LEVELS + showSubcategories} category={{
                children: categories,
                name: intl.formatMessage({ id: 'category-menu.departments.title' }),
              }} />
            }
          {this.departments.map(category => (
            <Fragment key={category.id}>
              <CategoryItem category={category} subcategoryLevels={DEFAULT_SUBCATEGORIES_LEVELS + showSubcategories} />
            </Fragment>
          ))}
        </ul>
      </nav>
    )
  }

  render() {
    const {
      mobileMode,
    } = this.props

    if (mobileMode) {
      return this.renderSideBar()
    }
    return this.renderMenu()
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
