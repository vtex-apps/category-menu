import React from 'react'
import { render } from '@vtex/test-tools/react'
import { CategoryMenuWithIntl } from '../index'

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

    return render(
      <CategoryMenuWithIntl
        data={{
          categories: mockedCategories,
          loading: false,
        }}
        departments={departments}
        {...customProps}
      />
    )
  }

  it('should be rendered', () => {
    expect(renderComponent()).toBeDefined()
  })

  it('should match snapshot', () => {
    expect(renderComponent().asFragment()).toMatchSnapshot()
  })

  it("shouldn't be able to find a `Category 4` item", () => {
    const element = renderComponent().queryByText(/Category 4/)

    expect(element).toBeNull()
  })
})
