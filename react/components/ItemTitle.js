import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { Link } from 'vtex.render-runtime'

import categoryMenuDisposition, {
  getMenuDispositionValues,
} from '../utils/categoryMenuDisposition'

import { itemPropType } from '../propTypes'

const ItemTitle = ({ item: { name, slug, params }, page, showBorder, onClick, menuDisposition }) => {
  const classes = classNames(
    'w-100 pv5 no-underline t-small outline-0 db tc ttu link truncate bb bw1 c-muted-1', {
      'b--transparent': !showBorder,
      'b--action-primary pointer': showBorder,
      'mr8': menuDisposition === categoryMenuDisposition.DISPLAY_LEFT.value,
      'ml8': menuDisposition === categoryMenuDisposition.DISPLAY_RIGHT.value,
      'mh6': menuDisposition === categoryMenuDisposition.DISPLAY_CENTER.value,
    }
  )

  return (slug || page || params) ? (
    <Link
      onClick={onClick}
      to={slug}
      page={page}
      params={params}
      className={classes}
    >
      {name.toUpperCase()}
    </Link>
  ) : (
    <span className={classes}>
      {name.toUpperCase()}
    </span>
  )
}

ItemTitle.propTypes = {
  item: itemPropType.isRequired,
  /** Page to which the user will be redirected. If is null, the item slug will be used, if present*/
  page: PropTypes.string,
  /** Params to be used in the page that the user will be redirected, if page is specified */
  params: PropTypes.object,
  /** Indicates if the bottom border must be shown */
  showBorder: PropTypes.bool,
  /** Function to be called when this item is clicked. */
  onClick: PropTypes.func,
  /** Indicates the disposition of the menu */
  menuDisposition: PropTypes.oneOf(getMenuDispositionValues()),
}

export default ItemTitle
