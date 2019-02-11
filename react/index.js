import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import { injectIntl, intlShape } from 'react-intl'
import { IconMenu } from 'vtex.dreamstore-icons'
import { withRuntimeContext } from 'vtex.render-runtime'
import { compose, path } from 'ramda'
import classNames from 'classnames'
import { Container } from 'vtex.store-components'

import CategoryItem from './components/CategoryItem'
import SideBar from './components/SideBar'
import { categoryPropType } from './propTypes'
import getCategories from './queries/categoriesQuery.gql'

import categoryMenu from './categoryMenu.css'
import categoryMenuDisposition, {
  getMenuDispositionNames,
  getMenuDispositionValues,
} from './utils/categoryMenuDisposition'

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
    showAllDepartments: PropTypes.bool,
    /** Whether to show subcategories or not */
    showSubcategories: PropTypes.bool,
    /** Defines the disposition of the category menu */
    menuDisposition: PropTypes.oneOf(getMenuDispositionValues()),
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
    showAllDepartments: true,
    showSubcategories: true,
    menuDisposition: categoryMenuDisposition.DISPLAY_LEFT.value,
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

    return (departmentsSelected.length && departmentsSelected) || categories
  }

  renderSideBar() {
    const {
      intl,
      showSubcategories,
    } = this.props

    const { sideBarVisible } = this.state

    return (
      <div className={`${categoryMenu.container} ${categoryMenu.mobile}`}>
        <SideBar
          visible={sideBarVisible}
          title={intl.formatMessage({ id: 'category-menu.departments.title' })}
          departments={this.departments}
          onClose={this.handleSidebarToggle}
          showSubcategories={showSubcategories} />
        <div className="flex pa4 pointer" onClick={this.handleSidebarToggle}>
          <IconMenu size={20} />
        </div>
      </div>
    )
  }

  renderMenu() {
    const {
      data: { categories = [] },
      intl,
      showAllDepartments,
      showSubcategories,
      menuDisposition,
      runtime,
    } = this.props

    const pathName = path(['route', 'params', 'department'], runtime)

    const department = pathName ? pathName : ''

    const desktopClasses = classNames(`${categoryMenu.container} w-100 bg-base dn flex-m`, {
      'justify-start mw9': menuDisposition === categoryMenuDisposition.DISPLAY_LEFT.value,
      'justify-end mw9': menuDisposition === categoryMenuDisposition.DISPLAY_RIGHT.value,
      'justify-center': menuDisposition === categoryMenuDisposition.DISPLAY_CENTER.value,
    })

    return (
      <Container className="justify-center flex">
        <nav className={desktopClasses}>
          <ul className="pa0 list ma0 flex flex-wrap flex-row t-action overflow-hidden h3">
            {showAllDepartments &&
            <CategoryItem
              noRedirect
              menuDisposition={menuDisposition}
              subcategoryLevels={DEFAULT_SUBCATEGORIES_LEVELS + showSubcategories}
              category={{
                children: categories,
                name: intl.formatMessage({ id: 'category-menu.departments.title' }),
              }}
            />
            }
            {this.departments.map((category) => (
              <Fragment key={category.id}>
                <CategoryItem
                  menuDisposition={menuDisposition}
                  category={category}
                  subcategoryLevels={DEFAULT_SUBCATEGORIES_LEVELS + showSubcategories}
                  isCategorySelected={department === category.slug}
                />
              </Fragment>
            ))}
          </ul>
        </nav>
      </Container>
    )
  }

  render() {
    const {
      mobileMode,
    } = this.props

    return mobileMode ? this.renderSideBar() : this.renderMenu()
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
    showAllDepartments: {
      type: 'boolean',
      title: 'editor.category-menu.show-departments-category.title',
      default: CategoryMenu.defaultProps.showAllDepartments,
    },
    menuDisposition: {
      title: 'editor.category-menu.disposition-type.title',
      type: 'string',
      enum: getMenuDispositionValues(),
      enumNames: getMenuDispositionNames(),
      default: categoryMenuDisposition.DISPLAY_LEFT.value,
      isLayout: true,
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

export default compose(graphql(getCategories), withRuntimeContext)(CategoryMenuWithIntl)
