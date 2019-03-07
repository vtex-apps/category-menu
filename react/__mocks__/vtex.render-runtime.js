import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { mergeRight } from 'ramda'

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

export const withRuntimeContext = Wrapped => {
  return ({ runtime, ...props }) => {
    return (
      <Wrapped
        {...props}
        runtime={mergeRight(
          {
            navigate: () => {},
            hints: { mobile: true },
          },
          runtime || {}
        )}
      />
    )
  }
}

export const useRuntime = () => {
  return {
    navigate: () => {},
    hints: { mobile: false },
  }
}
