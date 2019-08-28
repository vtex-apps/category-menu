import React from 'react'
import { render } from '@vtex/test-tools/react'
import SideBar from '../components/SideBar'

describe('SideBar component', () => {
  const renderComponent = customProps => {
    return render(
      <SideBar
        departments={[]}
        onClose={() => {}}
        showSubcategories
        visible={false}
        {...customProps}
      />
    )
  }

  it('should be rendered', () => {
    expect(renderComponent()).toBeDefined()
  })

  it('should match snapshot', () => {
    expect(renderComponent({ visible: true }).asFragment()).toMatchSnapshot()
  })
})
