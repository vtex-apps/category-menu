import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import getCategories from './queries/categoriesQuery.gql'
import CategoryItem from './components/CategoryItem'
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
    /** Categories query data */
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
      data: { categories },
    } = this.props
    const itemWidthPercent = 100 / (categories.length + 1)
    return (
      <div className="vtex-category-menu flex justify-center items-center bg-near-black white">
        <div className="vtex-category-menu__container h-100 w-70 flex justify-between items-center f6 overflow-hidden">
          <CategoryItem noRedirect category={{
            children: categories,
            name: 'Departamentos',
          }} widthPercent={itemWidthPercent} />
          {categories && categories.map(category => (
            <Fragment key={category.id}>
              <span className="br bw1 b--white-30 h1"></span>
              <CategoryItem category={category} widthPercent={itemWidthPercent} />
            </Fragment>
          ))}
        </div>
      </div>
    )
  }
}

export default graphql(getCategories)(CategoryMenu)
