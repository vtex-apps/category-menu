import { values, pluck } from 'ramda'

const categoryMenuPosition = {
  DISPLAY_CENTER: {
    name: 'admin/editor.category-menu.disposition-type.center',
    value: 'center',
  },
  DISPLAY_LEFT: {
    name: 'admin/editor.category-menu.disposition-type.left',
    value: 'left',
  },
  DISPLAY_RIGHT: {
    name: 'admin/editor.category-menu.disposition-type.right',
    value: 'right',
  },
}

export function getMenuPositionNames() {
  return pluck('name', values(categoryMenuPosition))
}

export function getMenuPositionValues() {
  return pluck('value', values(categoryMenuPosition))
}

export default categoryMenuPosition
