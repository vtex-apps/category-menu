import { values, pluck } from 'ramda'

const sortSubcategoriesItems = {
  SORT_DEFAULT: {
    name: 'admin/editor.category-menu.sort-type.default',
    value: '',
  },
  SORT_NAME: {
    name: 'admin/editor.category-menu.sort-type.name',
    value: 'name',
  },
}

export function getSortSubcategoriesNames() {
  return pluck('name', values(sortSubcategoriesItems))
}

export function getSortSubcategoriesValues() {
  return pluck('value', values(sortSubcategoriesItems))
}

export default sortSubcategoriesItems
