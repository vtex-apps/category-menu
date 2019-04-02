import React, { Component } from 'react'

export const Animation = ({ children }) => children

export class Container extends Component {
  render() {
    return this.props.children
  }
}
