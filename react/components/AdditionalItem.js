import  React, { Fragment, Component } from 'react'

import ChildrenContainer from './ChildrenContainer'
import ItemTitle from './ItemTitle'
import ItemContainer from './ItemContainer';
export default ({ 
  item, 
  item: { children }, 
  menuDisposition, 
  isSelected 
}) => (
  <ItemContainer>
    {({isHovered, containerRef, setIsHovered }) => (
      <Fragment>
        <ItemTitle 
          item={item}
          menuDisposition={menuDisposition} 
          isSelected={isSelected} 
          showBorder={isHovered}
        />
        <ChildrenContainer
          menuDisposition={menuDisposition}
          containerRef={containerRef}
          showSecondLevel={children.some(child => child.children && child.children.length > 0)}
          items={children}
          isShowing={isHovered}
          onCloseMenu={() => setIsHovered(false)}
        />
      </Fragment>
    )}
  </ItemContainer>
)