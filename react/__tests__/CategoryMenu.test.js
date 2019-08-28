import React from 'react'
import { render, wait } from '@vtex/test-tools/react'
import CategoryMenu from '../index'
import categoriesQuery from '../queries/categoriesQuery.gql'

describe('CategoryMenu component', () => {
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

  const renderComponent = customProps => {
    const departments = mockedCategories.map(category => ({ id: category.id }))

    const mocks = [
      {
        request: {
          query: categoriesQuery,
        },
        result: {
          data: { categories: mockedCategories },
        },
      },
    ]

    return render(<CategoryMenu departments={departments} {...customProps} />, {
      graphql: { mocks },
    })
  }

  it('should be rendered', () => {
    expect(renderComponent()).toBeDefined()
  })

  it('should match snapshot', async () => {
    const { asFragment } = renderComponent()

    await wait(() => {})

    expect(asFragment()).toMatchSnapshot()
  })

  it("shouldn't be able to find a `Category 4` item", async () => {
    const element = renderComponent().queryByText(/Category 4/)

    await wait(() => expect(element).toBeNull())
  })
})
