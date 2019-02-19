import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { itemPropType } from '../propTypes'

import ChildrenContainer from './ChildrenContainer'
import ItemTitle from './ItemTitle'
import ItemContainer from './ItemContainer'

const AdditionalItem = ({
  item,
  item: { children, name },
  menuPosition,
  isSelected,
}) => (
  <ItemContainer itemKey={name}>
    {({ isHovered, containerRef, setIsHovered }) => (
      <Fragment>
        <ItemTitle
          item={item}
          menuPosition={menuPosition}
          isSelected={isSelected}
          showBorder={isHovered}
        />
        {children && children.length > 0 && (
          <ChildrenContainer
            menuPosition={menuPosition}
            containerRef={containerRef}
            showSecondLevel={children.some(
              child => child.children && child.children.length > 0
            )}
            items={children}
            isShowing={isHovered}
            onCloseMenu={() => setIsHovered(false)}
          />
        )}
      </Fragment>
    )}
  </ItemContainer>
)

AdditionalItem.propTypes = {
  item: itemPropType,
  menuPosition: PropTypes.string,
  isSelected: PropTypes.bool,
}

export default AdditionalItem
