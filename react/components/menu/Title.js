import React from 'react'
import classNames from 'classnames'
import categoryMenuDisposition, { getMenuDispositionValues } from '../../utils/categoryMenuDisposition'

export default Title = ({ item: { name, slug }, isSelected, isHovered, menuDisposition }) => {
  const classes = classNames(
    'w-100 pv5 no-underline t-small outline-0 db tc ttu link truncate bb bw1 c-muted-1', {
      'b--transparent': !isHovered && !isSelected,
      'b--action-primary pointer': isHovered || isSelected,
      'mr8': menuDisposition === categoryMenuDisposition.DISPLAY_LEFT.value,
      'ml8': menuDisposition === categoryMenuDisposition.DISPLAY_RIGHT.value,
      'mh6': menuDisposition === categoryMenuDisposition.DISPLAY_CENTER.value,
    }
  )

  return slug ? (
    <Link
      onClick={this.handleCloseMenu}
      to={slug}
      pa
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