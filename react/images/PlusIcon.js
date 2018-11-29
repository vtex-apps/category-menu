import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Profile icon component in svg
 */
export default class PlusIcon extends Component {
  static propTypes = {
    /* Percentage size of the icon */
    size: PropTypes.number,
    /* Fill color for the icon */
    fillColor: PropTypes.string,
  }

  static defaultProps = {
    size: 20,
    fillColor: '#3f3f40',
  }

  render() {
    const { size, fillColor } = this.props
    return (
      <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <title>e add</title>
        <g secondaryFill={fillColor}>
        <path d="M15,7H9V1c0-0.6-0.4-1-1-1S7,0.4,7,1v6H1C0.4,7,0,7.4,0,8s0.4,1,1,1h6v6c0,0.6,0.4,1,1,1s1-0.4,1-1V9h6 c0.6,0,1-0.4,1-1S15.6,7,15,7z" fill={fillColor}/>
        </g>
      </svg>
    )
  }
}
