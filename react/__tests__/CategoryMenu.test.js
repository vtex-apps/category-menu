/* eslint-env jest */
import React from 'react'
import { render } from 'react-testing-library'
import { MockedProvider } from 'react-apollo/test-utils'

import CategoryMenu from '../CategoryMenu'
import getCategories from '../queries/categoriesQuery.gql'

describe('CategoryMenu component', () => {
  let wrapper

  beforeEach(done => {
    const mockedCategories = [
      {
        id: 1,
        href: '#1',
        name: 'Category 1',
        slug: 'category-1',
        hasChildren: false,
        children: [],
      },
      {
        id: 2,
        href: '#2',
        name: 'Category 2',
        slug: 'category-2',
        hasChildren: false,
        children: [],
      },
      {
        id: 3,
        href: '#3',
        name: 'Category 3',
        slug: 'category-3',
        hasChildren: false,
        children: [],
      },
    ]

    wrapper = render(
      <MockedProvider
        mocks={[
          {
            request: { query: getCategories },
            result: { data: { categories: mockedCategories } },
          },
        ]}
      >
        <CategoryMenu />
      </MockedProvider>
    )

    // necessary because we need to wait for the graphql
    // response, even if it's a mocked one
    setTimeout(() => {
      done()
    }, 0)
  })

  it('should be rendered', () => {
    expect(wrapper).toBeDefined()
  })

  it('should match snapshot', () => {
    expect(wrapper.container).toMatchSnapshot()
  })

  it('should render 3 menu items', () => {
    expect(
      wrapper.container.querySelectorAll('[data-testid="category-item"]').length
    ).toBe(3)
  })
})
