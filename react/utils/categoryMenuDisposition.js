import { values, map } from 'ramda'

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
  return map(opt => opt.name, values(categoryMenuDisposition))
}

export function getMenuDispositionValues() {
  return map(opt => opt.value, values(categoryMenuDisposition))
}

export default categoryMenuDisposition