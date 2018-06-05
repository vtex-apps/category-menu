import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class NoSSR extends Component {
  static propTypes = {
    children: PropTypes.any,
  }

  render() {
    return this.props.children
  }
}

export class Link extends Component {
  static propTypes = {
    page: PropTypes.string,
    children: PropTypes.any,
    className: PropTypes.string,
  }

  render() {
    return (
      <a
        className={this.props.className}
        href={this.props.page}
      >
        {this.props.children}
      </a>
    )
  }
}

