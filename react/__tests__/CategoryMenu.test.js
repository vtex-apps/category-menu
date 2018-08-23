import React from 'react'
import { mount } from 'enzyme'
import { IntlProvider } from 'react-intl'
import { CategoryMenuWithIntl } from '../CategoryMenu'

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

    const messages = require('../locales/en-US')

    wrapper = mount(
      <IntlProvider locale="en-US" messages={messages}>
        <CategoryMenuWithIntl
          data={{
            categories: mockedCategories,
            loading: false,
          }}
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

  it('should render 4 menu items', () => {
    expect(wrapper.find('.vtex-category-menu__item').length).toBe(4)
  })

  it("shouldn't be able to find a `Category 4` item", () => {
    expect(wrapper.containsMatchingElement(<a>Category 4</a>)).toBe(false)
  })
})
