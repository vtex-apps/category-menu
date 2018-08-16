import PropTypes from 'prop-types'

function lazyFunction(f) {
  return function() {
    return f.apply(this, arguments)
  }
}

export const categoryPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(lazyFunction(() => categoryPropType)),
})

export const categoryItemShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  slug: PropTypes.string,
  children: PropTypes.arrayOf(lazyFunction(() => categoryPropType)),
})
