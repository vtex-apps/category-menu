/* eslint-env jest */
import React from 'react'
import { render } from 'react-testing-library'

import CategoryItem from '../components/CategoryItem'

describe('CategoryItem component', () => {
  let wrapper

  beforeEach(() => {
    const categoryMock = {
      id: 1,
      name: 'Category',
      href: '#1',
      slug: 'category',
      hasChildren: true,
      children: [
        {
          id: 2,
          name: 'Sub-category',
          href: '#2',
          slug: 'sub-category',
        },
      ],
    }

    wrapper = render(<CategoryItem category={categoryMock} />)
  })

  it('should have the correct href', () => {
    expect(wrapper.getByText('Category').href).toBe(`${location.href}#1`)
  })

  it('should match snapshot', () => {
    expect(wrapper.container).toMatchSnapshot()
  })
})
