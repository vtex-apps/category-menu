import React from 'react'
import { render } from '@vtex/test-tools/react'

import CategoryItem from '../components/CategoryItem'

describe('CategoryItem component', () => {
  let wrapper

  beforeEach(() => {
    const categoryMock = {
      id: 1,
      name: 'Category',
      slug: 'category',
      hasChildren: true,
      children: [
        {
          id: 2,
          name: 'Sub-category',
          slug: 'sub-category',
        },
      ],
    }

    wrapper = render(<CategoryItem category={categoryMock} />)
  })

  it('should have the correct href', () => {
    const element = wrapper.getByText(/CATEGORY/i)

    expect(element.href).toMatch(/\/category\/s$/i)
  })

  it('should match snapshot', () => {
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
