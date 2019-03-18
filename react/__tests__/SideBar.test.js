import React from 'react'
import { render, fireEvent, act } from '@vtex/test-tools/react'
import { SideBar } from '../components/SideBar'

describe('SideBar component', () => {
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
    return render(
      <SideBar
        departments={mockedCategories}
        onClose={() => {}}
        showSubcategories={true}
        {...customProps}
      />
    )
  }

  it('should be rendered', () => {
    expect(renderComponent()).toBeDefined()
  })

  // it('should match snapshot', () => {
  //   expect(renderComponent({ visible: true })).toMatchSnapshot()
  // })
})
