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
import messages from './utils/messages'

const DEFAULT_SUBCATEGORIES_LEVELS = 1

/**
 * Component that represents the menu containing the categories of the store
 */
class CategoryMenu extends Component {
  static propTypes = {
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
          title={intl.formatMessage(messages.allDepartmentsTitle)}
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
        departmentsTitle={intl.formatMessage(messages.allDepartmentsTitle)}
        additionalItems={additionalItems}
      />
    )
  }
}

const simpleItemSchema = {
  name: {
    title: messages.itemTitle,
    type: 'string',
  },
  slug: {
    title: messages.itemSlug,
    type: 'string',
  },
}

const additionalItemsSchema = {
  title: messages.additionalItemsTitle,
  type: 'array',
  minItems: 0,
  items: {
    title: messages.additionalItemsTitle,
    type: 'object',
    properties: {
      ...simpleItemSchema,
      children: {
        title: messages.subItemFirstLevelTitle,
        type: 'array',
        minItems: 0,
        items: {
          title: messages.subItemFirstLevelTitle,
          type: 'object',
          properties: {
            ...simpleItemSchema,
            children: {
              title: messages.subItemSecondLevelTitle,
              type: 'array',
              minItems: 0,
              items: {
                title: messages.subItemSecondLevelTitle,
                type: 'object',
                properties: simpleItemSchema,
              },
            },
          },
        },
      },
    },
  },
}

CategoryMenu.schema = {
  title: messages.categoryMenuTitle,
  description: messages.categoryMenuDescription,
  type: 'object',
  properties: {
    showAllDepartments: {
      type: 'boolean',
      title: messages.showAllDepartmentsTitle,
      default: CategoryMenu.defaultProps.showAllDepartments,
    },
    menuPosition: {
      title: messages.menuPositionTitle,
      type: 'string',
      enum: getMenuPositionValues(),
      enumNames: getMenuPositionNames(),
      default: categoryMenuPosition.DISPLAY_CENTER.value,
      isLayout: true,
    },
    showSubcategories: {
      type: 'boolean',
      title: messages.showSubcategoriesTitle,
      default: CategoryMenu.defaultProps.showSubcategories,
    },
    departments: {
      title: messages.departmentsTitle,
      type: 'array',
      minItems: 0,
      items: {
        title: messages.departmentsItemsTitle,
        type: 'object',
        properties: {
          id: {
            title: messages.departmentIdTitle,
            type: 'number',
          },
        },
      },
    },
    additionalItems: { ...additionalItemsSchema },
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
