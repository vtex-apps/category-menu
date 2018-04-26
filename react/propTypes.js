import PropTypes from 'prop-types'

function lazyFunction(f) {
  return function() {
    return f.apply(this, arguments)
  }
}

export const categoryPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  hasChildren: PropTypes.bool,
  children: PropTypes.arrayOf(lazyFunction(() => categoryPropType)),
})
