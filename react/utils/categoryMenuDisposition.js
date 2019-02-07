import { values, pluck } from 'ramda'

const categoryMenuDisposition = {
  DISPLAY_CENTER: {
    name: 'editor.category-menu.disposition-type.center',
    value: 'center',
  },
  DISPLAY_LEFT: {
    name: 'editor.category-menu.disposition-type.left',
    value: 'left',
  },
  DISPLAY_RIGHT: {
    name: 'editor.category-menu.disposition-type.right',
    value: 'right',
  },
}

export function getMenuDispositionNames() {
  return pluck('name', values(categoryMenuDisposition))
}

export function getMenuDispositionValues() {
  return pluck('value', values(categoryMenuDisposition))
}

export default categoryMenuDisposition