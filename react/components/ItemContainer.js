import React from 'react'
import { useState, useRef } from 'react'
import PropTypes from 'prop-types'

import categoryMenu from '../categoryMenu.css'

const ItemContainer = ({ children, itemKey }) => {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef(null)

  return (
    <li
      className={`${categoryMenu.itemContainer} flex items-center db list`}
      key={itemKey}
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children({
        isHovered,
        containerRef: containerRef && containerRef.current,
        setIsHovered: setIsHovered,
      })}
    </li>
  )
}

ItemContainer.propTypes = {
  /** Function to render children */
  children: PropTypes.func.isRequired,
  /** Key to be used in container */
  itemKey: PropTypes.string.isRequired,
}

export default ItemContainer
