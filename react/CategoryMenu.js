import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NoSSR } from 'render'
import { graphql } from 'react-apollo'

import getCategories from './queries/categoriesQuery.gql'
import CategoryItem from './components/CategoryItem'
import LoadingBar from './components/LoadingBar'
import { categoryPropType } from './propTypes'

import './global.css'

/**
 * Component that represents the menu containing the categories of the store
 */
export class CategoryMenu extends Component {
  static propTypes = {
    /** Whether to show the promotion category or not */
    showPromotionCategory: PropTypes.bool,
    /** Whether to show the gift category or not */
    showGiftCategory: PropTypes.bool,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      categories: PropTypes.arrayOf(categoryPropType),
    }),
  }

  static defaultProps = {
    showPromotionCategory: false,
    showGiftCategory: false,
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

  render() {
    const {
      data: { categories, loading },
    } = this.props

    const fallback = (
      <div className="vtex-category-menu ph7-l ph4 ph5-ns">
        <nav className="flex center h-100">
          <CategoryItem
            category={{ id: 0, name: 'Category', href: '#category' }}
          />
        </nav>
      </div>
    )

    return (
      <NoSSR onSSR={fallback}>
        <div className="vtex-category-menu ph7-l ph4 ph5-ns">
          <LoadingBar loading={loading}>
            <nav id='vtex-category-menu-nav' className="flex center h-100">
              {categories &&
                categories.map(category => (
                  <CategoryItem key={category.id} category={category} />
                ))}
            </nav>
          </LoadingBar>
        </div>
      </NoSSR>
    )
  }
}

export default graphql(getCategories)(CategoryMenu)
