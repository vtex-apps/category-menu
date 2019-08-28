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

export function Link({ params, className, children }) {
  // eslint-disable-line react/prop-types
  return (
    <a className={className} href={`/${params.department}/s`}>
      {children}
    </a>
  )
}

export const withRuntimeContext = component => (
  <component
    runtime={{
      navigate: () => {},
    }}
  />
)

export const useRuntime = () => ({ navigate: jest.fn() })
