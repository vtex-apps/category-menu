import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { injectIntl, intlShape } from 'react-intl'
import { compose } from 'ramda'
import { IconMenu } from 'vtex.dreamstore-icons'
import { withRuntimeContext } from 'vtex.render-runtime'

import SideBar from './components/SideBar'
import Menu from './components/Menu'
import { itemPropType } from './propTypes'
import getCategories from './queries/categoriesQuery.gql'

import categoryMenu from './categoryMenu.css'
import categoryMenuPosition, {
  getMenuPositionNames,
  getMenuPositionValues,
} from './utils/categoryMenuPosition'

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
      categories: PropTypes.arrayOf(itemPropType),
    }),
    /** Set mobile mode */
    mobileMode: PropTypes.bool,
    /** Whether to show the departments category or not */
    showAllDepartments: PropTypes.bool,
    /** Whether to show subcategories or not */
    showSubcategories: PropTypes.bool,
    /** Defines the position of the category menu */
    menuPosition: PropTypes.oneOf(getMenuPositionValues()),
    /** Intl */
    intl: intlShape,
    /** Departments to be shown in the desktop mode. */
    departments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
      })
    ),
    /** Additional items */
    additionalItems: PropTypes.arrayOf(itemPropType),
    /** Render runtime */
    runtime: PropTypes.shape({
      hints: PropTypes.shape({
        mobile: PropTypes.bool,
      }),
    }),
  }

  static defaultProps = {
    showPromotionCategory: false,
    showGiftCategory: false,
    mobileMode: false,
    showAllDepartments: true,
    showSubcategories: true,
    menuPosition: categoryMenuPosition.DISPLAY_CENTER.value,
    additionalItems: [],
    departments: [],
  }

  state = {
    sideBarVisible: false,
  }

  handleSidebarToggle = () => {
    this.setState({ sideBarVisible: !this.state.sideBarVisible })
  }

  get departments() {
    const {
      data: { categories = [] },
      departments,
    } = this.props
    const departmentsIds = departments.map(dept => dept.id)
    const departmentsSelected = categories.filter(category =>
      departmentsIds.includes(category.id)
    )

    return (departmentsSelected.length && departmentsSelected) || categories
  }

  render() {
    const {
      data: { categories = [] },
      showAllDepartments,
      showSubcategories,
      menuPosition,
      additionalItems,
      intl,
      runtime: {
        hints: { mobile },
      },
    } = this.props

    const { sideBarVisible } = this.state

    return mobile ? (
      <div
        className={`${categoryMenu.sidebarContainer} ${categoryMenu.mobile}`}
      >
        <SideBar
          visible={sideBarVisible}
          title={intl.formatMessage({ id: 'category-menu.departments.title' })}
          departments={this.departments}
          onClose={this.handleSidebarToggle}
          showSubcategories={showSubcategories}
          additionalItems={additionalItems}
        />
        <div className="flex pa4 pointer" onClick={this.handleSidebarToggle}>
          <IconMenu size={20} />
        </div>
      </div>
    ) : (
      <Menu
        categories={categories}
        showAllDepartments={showAllDepartments}
        menuPosition={menuPosition}
        subcategoryLevels={DEFAULT_SUBCATEGORIES_LEVELS + showSubcategories}
        departments={this.departments}
        departmentsTitle={intl.formatMessage({
          id: 'category-menu.departments.title',
        })}
        additionalItems={additionalItems}
      />
    )
  }
}

CategoryMenu.schema = {
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
    menuPosition: {
      title: 'editor.category-menu.position-type.title',
      type: 'string',
      enum: getMenuPositionValues(),
      enumNames: getMenuPositionNames(),
      default: categoryMenuPosition.DISPLAY_CENTER.value,
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
      title: 'editor.category-menu.departments.title',
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
    additionalItems: {
      title: 'editor.category-menu.additional-items.title',
      type: 'array',
      minItems: 0,
      items: {
        title: 'editor.category-menu.additional-items.items.title',
        type: 'object',
        properties: {
          name: {
            title: 'editor.category-menu.additional-items.items.name',
            type: 'string',
          },
          slug: {
            title: 'editor.category-menu.additional-items.items.slug',
            type: 'string',
          },
          children: {
            title: 'editor.category-menu.additional-items.items.children',
            type: 'array',
            minItems: 0,
            items: {
              title:
                'editor.category-menu.additional-items.items.children.child.title',
              type: 'object',
              properties: {
                name: {
                  title: 'editor.category-menu.additional-items.items.name',
                  type: 'string',
                },
                slug: {
                  title: 'editor.category-menu.additional-items.items.slug',
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  },
}

const LocalCategoryMenu = compose(
  withRuntimeContext,
  injectIntl
)(CategoryMenu)
export { LocalCategoryMenu }

export default compose(
  graphql(getCategories),
  withRuntimeContext,
  injectIntl
)(CategoryMenu)
