import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { graphql } from 'react-apollo'

import getCategories from './queries/categoriesQuery.gql'
import { categoryPropType } from './propTypes'
import CategoryItem from './components/CategoryItem'
import SideBar from './components/SideBar'
import HamburguerIcon from './images/HamburguerIcon'

const MAX_NUMBER_OF_MENUS = 6

import './global.css'

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
    /** Intl */
    intl: intlShape,
  }

  static defaultProps = {
    showPromotionCategory: false,
    showGiftCategory: false,
    mobileMode: false,
  }

  static schema = {
    title: 'editor.category-menu.title',
    description: 'editor.category-menu.description',
    type: 'object',
    properties: {
      showPromotionCategory: {
        type: 'boolean',
        title: 'editor.category-menu.show-promotion-category.title',
      },
      showGiftCategory: {
        type: 'boolean',
        title: 'editor.category-menu.show-gift-category.title',
      },
    },
  }

  state = {
    sideBarVisible: false,
  }

  handleSidebarToggle = () => {
    this.setState({ sideBarVisible: !this.state.sideBarVisible })
  }

  render() {
    const {
      data: { categories = [] },
      intl,
      mobileMode,
    } = this.props
    const categoriesSliced = categories.slice(0, MAX_NUMBER_OF_MENUS)
    if (mobileMode) {
      return (
        <Fragment>
          <SideBar
            visible={this.state.sideBarVisible}
            title={intl.formatMessage({ id: 'category-menu.departments.title' })}
            departments={categories}
            onClose={this.handleSidebarToggle} />
          <div className="flex pa4 pointer" onClick={this.handleSidebarToggle}>
            <HamburguerIcon />
          </div>
        </Fragment>
      )
    }
    return (
      <div className="vtex-category-menu bg-white dn flex-m justify-center w-100">
        <div className="vtex-category-menu__container flex flex-wrap justify-center items-end h3 w-100 w-90-l w-80-xl ph3-s ph7-m ph6-xl f6 overflow-hidden">
          <CategoryItem noRedirect category={{
            children: categories,
            name: intl.formatMessage({ id: 'category-menu.departments.title' }),
          }} />
          {categoriesSliced.map(category => (
            <div key={category.id} className="flex items-center">
              <span className="mt3 br bw1 h1 b--light-gray"></span>
              <CategoryItem category={category} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export const CategoryMenuWithIntl = injectIntl(CategoryMenu)
export default graphql(getCategories)(CategoryMenuWithIntl)
