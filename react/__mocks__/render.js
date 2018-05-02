import { Component } from 'react'
import PropTypes from 'prop-types'

export class NoSSR extends Component {
  static propTypes = {
    children: PropTypes.any,
  }

  render() {
    return this.props.children
  }
}
