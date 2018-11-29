import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Profile icon component in svg
 */
export default class HamburguerIcon extends Component {
  static propTypes = {
    /* Percentage size of the icon */
    size: PropTypes.number,
    /* Fill color for the icon */
    fillColor: PropTypes.string,
  }

  static defaultProps = {
    size: 20,
    fillColor: '#979899',
  }

  render() {
    const { size, fillColor } = this.props
    return (
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 317.825 317.825" width={`${size}px`} height={`${size}px`}>
        <g>
          <path d="M301.934,143.021H15.891C7.119,143.021,0,150.14,0,158.912c0,8.772,7.119,15.891,15.891,15.891      h286.042c8.74,0,15.891-7.119,15.891-15.891C317.825,150.14,310.674,143.021,301.934,143.021z" fill={fillColor} />
          <path d="M15.891,79.456h286.042c8.74,0,15.891-7.119,15.891-15.891s-7.151-15.891-15.891-15.891H15.891      C7.119,47.674,0,54.793,0,63.565S7.119,79.456,15.891,79.456z" fill={fillColor} />
          <path d="M301.934,238.369H15.891C7.119,238.369,0,245.52,0,254.26c0,8.74,7.119,15.891,15.891,15.891      h286.042c8.74,0,15.891-7.151,15.891-15.891C317.825,245.52,310.674,238.369,301.934,238.369z" fill={fillColor} />
        </g>
      </svg>
    )
  }
}
