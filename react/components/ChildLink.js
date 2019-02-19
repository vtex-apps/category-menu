import { Link } from 'vtex.render-runtime'
import PropTypes from 'prop-types'

import { itemPropType } from '../propTypes'

const ChildLink = ({
  item: { name, params, slug, page },
  onClick,
  className,
}) => {
  return (
    <li className="list pa0">
      <Link
        onClick={onClick}
        page={page}
        to={page ? undefined : slug}
        className={className}
        params={params}
      >
        {name}
      </Link>
    </li>
  )
}

ChildLink.propTypes = {
  /** Item to be displayed */
  item: itemPropType,
  /** Handle's the click event */
  onClick: PropTypes.func,
  /** Classname to use on link */
  className: PropTypes.string,
}

export default ChildLink
