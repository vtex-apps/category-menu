import React, { Component } from 'react'
import PropTypes from 'prop-types'

import categoryMenu from '../categoryMenu.css'

export default class ItemContainer extends Component {
  static propTypes = {
    /** Function to render children */
    children: PropTypes.func.isRequired,
    /** Key to be used in container */
    itemKey: PropTypes.string.isRequired,
  }

  state = { isHovered: false }

  setIsHovered = isHovered => this.setState({ isHovered })

  render() {
    const { children, itemKey } = this.props
    const { isHovered } = this.state

    return (
      <li className={`${categoryMenu.itemContainer} flex items-center db list`} key={itemKey}
        ref={e => this.containerRef = e}
        onMouseEnter={() => this.setState({ isHovered: true })}
        onMouseLeave={() => this.setState({ isHovered: false })}
      >
        {
          children({
            isHovered,
            containerRef: this.containerRef,
            setIsHovered: this.setIsHovered,
          })
        }
      </li>
    )
  }
}
