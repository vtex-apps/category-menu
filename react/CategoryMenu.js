import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import getCategories from './queries/categoriesQuery.gql'
import CategoryItem from './components/CategoryItem'
import LoadingBar from './components/LoadingBar'

/**
 * Component that represents the menu containing the categories of the store
 */
export class CategoryMenu extends Component {
  render() {
    const {
      data: { categories, loading },
    } = this.props

    return (
      <LoadingBar loading={loading}>
        <div className="category-menu h3 bg-near-white">
          <nav className="flex w-two-thirds center h0">
            {categories &&
              categories.map(category => (
                <CategoryItem key={category.id} category={category} />
              ))}
          </nav>
        </div>
      </LoadingBar>
    )
  }
}

CategoryMenu.propTypes = {
  /** Whether to show the promotion category or not */
  showPromotionCategory: PropTypes.bool,
  /** Whether to show the gift category or not */
  showGiftCategory: PropTypes.bool,
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      })
    ),
  }),
}

CategoryMenu.defaultProps = {
  showPromotionCategory: false,
  showGiftCategory: false,
}

CategoryMenu.schema = {
  title: 'Category Menu',
  description: 'A menu showing a list of the available categories on the store',
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

export default graphql(getCategories)(CategoryMenu)
