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
    title: 'Category Menu',
    description:
      'A menu showing a list of the available categories on the store',
    type: 'object',
    properties: {
      showPromotionCategory: {
        type: 'boolean',
        title: 'Show the promotion category',
      },
      showGiftCategory: {
        type: 'boolean',
        title: 'Show the gifts category',
      },
    },
  }

  render() {
    const {
      data: { categories, loading },
    } = this.props

    const fallback = (
      <div className="vtex-category-menu">
        <nav className="flex w-two-thirds center h-100">
          <CategoryItem category={{ id: 0, name: 'Category', href: '#category' }} />
        </nav>
      </div>
    )

    return (
      <NoSSR onSSR={fallback}>
        <div className="vtex-category-menu">
          <LoadingBar loading={loading}>
            <nav className="flex w-two-thirds center h-100">
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
