import React from 'react'
import PropTypes from 'prop-types'

const LoadingBar = ({ children, loading, fallback }) =>
  loading ? (
    <div className="loading-container h3 bg-near-white">
      <div className="loading-bar" />
      {fallback}
    </div>
  ) : (
    children
  )

LoadingBar.propTypes = {
  /** Node to be displayed when not loading */
  children: PropTypes.node.isRequired,
  /** Fallback node to show while loading content */
  fallback: PropTypes.node,
  /** Show the loading? */
  loading: PropTypes.bool,
}

LoadingBar.defaultProps = {
  loading: false,
  fallback: null,
}

export default LoadingBar