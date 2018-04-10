import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import classNames from 'classnames'

import categoryQuery from './queries/categoryQuery.gql'

/**
 * Component that represents a single category displayed in the menu, also displays
 * the subcategories, if the provided category has them
 */
class CategoryItem extends Component {
  render() {
    const { data: { category } } = this.props

    const wrapperClasses = classNames('h3 pl5 pr4 vtex-category-item', {
      'show-arrow': category.hasChildren,
    })

    return (
      <div className={wrapperClasses}>
        <a href={category.href} className="db mt6 no-underline ttu black-90">
          {category.name}
        </a>

        {category.hasChildren && (
          <div className="vtex-category-sub-menu pv6 ph5 br2 br--bottom">
            <ul className="list ma0 pa0 f6">
              {category.children.map(subCategory => (
                <li key={subCategory.id} className="lh-copy">
                  <a
                    className="near-black no-underline underline-hover"
                    href={subCategory.href}
                  >
                    {subCategory.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

CategoryItem.propTypes = {
  data: PropTypes.shape({
    category: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      hasChildren: PropTypes.bool.isRequired,
    }),
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  /** Id of the category */
  id: PropTypes.number.isRequired,
}

const options = {
  options: props => ({
    variables: {
      id: props.id,
    },
  }),
}

export default graphql(categoryQuery, options)(CategoryItem)
