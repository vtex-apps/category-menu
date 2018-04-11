import React from 'react'
import Spinner from '@vtex/styleguide/lib/Spinner'

import spinnerStyle from './spinner.css'

const WrappedSpinner = () => (
  <div className="w-100 flex justify-center">
    <Spinner style={spinnerStyle} />
  </div>
)

export default WrappedSpinner
