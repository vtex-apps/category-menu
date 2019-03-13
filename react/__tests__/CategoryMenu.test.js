import React from 'react'
import { render } from '@vtex/test-tools/react'
import { LocalCategoryMenu } from '../index'

describe('CategoryMenu component', () => {
  let wrapper

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

  const departments = mockedCategories.map(category => ({ id: category.id }))

  beforeEach(() => {
    wrapper = render(
      <LocalCategoryMenu
        data={{
          categories: mockedCategories,
          loading: false,
        }}
        runtime={{ hints: { desktop: true, mobile: false } }}
        departments={departments}
      />
    )
  })

  it('should be rendered', () => {
    expect(wrapper).toBeDefined()
  })

  it('should match snapshot', () => {
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it("shouldn't be able to find a `Category 4` item", () => {
    const element = wrapper.queryByText(/Category 4/)

    expect(element).toBeNull()
  })

  it('should match sidebar snapshot', () => {
    const { asFragment } = render(
      <LocalCategoryMenu
        data={{ categories: mockedCategories, loading: false }}
        departments={departments}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
