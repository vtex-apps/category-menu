import React from 'react'
import { shallow } from 'enzyme'

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

    wrapper = shallow(<CategoryItem category={categoryMock} />)
  })

  it('should have the correct href', () => {
    expect(wrapper.find({ params: { department: 'category' } }).exists()).toBe(
      true
    )
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
