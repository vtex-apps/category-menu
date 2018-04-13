import React from 'react'
import { mount } from 'enzyme'

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

    wrapper = mount(<CategoryItem category={categoryMock} />)
  })

  it('should have the correct href', () => {
    expect(wrapper.getDOMNode().querySelector('a').href).toBe(
      `${location.href}#1`
    )
  })

  it('should match snapshot', () => {
    expect(wrapper.getElement()).toMatchSnapshot()
  })
})
