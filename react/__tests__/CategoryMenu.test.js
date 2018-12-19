import React from 'react'
import { mount } from 'enzyme'
import { IntlProvider } from 'react-intl'
import { CategoryMenuWithIntl } from '../index'

describe('CategoryMenu component', () => {
  let wrapper

  beforeEach(() => {
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
    const messages = require('../../messages/en-US.json')

    wrapper = mount(
      <IntlProvider locale="en-US" messages={messages}>
        <CategoryMenuWithIntl
          data={{
            categories: mockedCategories,
            loading: false,
          }}
          departments={departments}
        />
      </IntlProvider>
    )
  })

  it('should be rendered', () => {
    expect(wrapper).toBeDefined()
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it("shouldn't be able to find a `Category 4` item", () => {
    expect(wrapper.containsMatchingElement(<a>Category 4</a>)).toBe(false)
  })
})
