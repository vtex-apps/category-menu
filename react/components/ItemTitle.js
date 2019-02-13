import React from 'react'
import classNames from 'classnames'
import { Link } from 'vtex.render-runtime'
import categoryMenuDisposition from '../utils/categoryMenuDisposition'

export default ({ item: { name, slug, params }, page, showBorder, isHovered, onClick, menuDisposition }) => {
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
      {...(params && page && slug)}
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