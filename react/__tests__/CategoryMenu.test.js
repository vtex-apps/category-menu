import React from 'react'
<<<<<<< HEAD
import { render } from '@vtex/test-tools/react'
import { CategoryMenuWithIntl } from '../index'
=======
import { render } from 'test-utils'
import { LocalCategoryMenu } from '../index'
>>>>>>> Update snapshots and remove unecessary imports

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

  beforeEach(() => {
    const departments = mockedCategories.map(category => ({ id: category.id }))

    wrapper = render(
      <CategoryMenuWithIntl
        data={{
          categories: mockedCategories,
          loading: false,
        }}
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
        runtime={{ hints: { mobile: true } }}
        data={{ categories: mockedCategories, loading: false }}
        departments={departments}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
