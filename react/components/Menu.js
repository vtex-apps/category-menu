import React from 'react'
import classNames from 'classnames'
import { path } from 'ramda'
import PropTypes from 'prop-types'
import { Container } from 'vtex.store-components'
import { useRuntime } from 'vtex.render-runtime'

import CategoryItem from './CategoryItem'
import AdditionalItem from './AdditionalItem'
import { itemPropType } from '../propTypes'

import categoryMenu from '../categoryMenu.css'

import categoryMenuPosition, {
  getMenuPositionValues,
} from '../utils/categoryMenuPosition'

const Menu = ({
  categories = [],
  departments,
  departmentsTitle,
  showAllDepartments,
  subcategoryLevels,
  menuPosition,
  additionalItems,
}) => {
  const departamentPath = path(['route', 'params', 'department'], useRuntime())
  const fullPath = path(['route', 'path'], useRuntime())

  const currentSlug = departamentPath || fullPath

  const desktopClasses = classNames(
    `${categoryMenu.container} w-100 bg-base dn flex-m`,
    {
      'justify-start mw9':
        menuPosition === categoryMenuPosition.DISPLAY_LEFT.value,
      'justify-end mw9':
        menuPosition === categoryMenuPosition.DISPLAY_RIGHT.value,
      'justify-center':
        menuPosition === categoryMenuPosition.DISPLAY_CENTER.value,
    }
  )

  return (
    <Container className="justify-center flex">
      <nav className={desktopClasses}>
        <ul className="pa0 list ma0 flex flex-wrap flex-row t-action overflow-hidden h3">
          {showAllDepartments && (
            <CategoryItem
              menuPosition={menuPosition}
              subcategoryLevels={subcategoryLevels}
              category={{
                children: categories,
                name: departmentsTitle,
              }}
            />
          )}
          {departments.map(category => (
            <CategoryItem
              key={category.id}
              menuPosition={menuPosition}
              category={category}
              subcategoryLevels={subcategoryLevels}
              isCategorySelected={currentSlug === category.slug}
            />
          ))}
          {additionalItems &&
            additionalItems.map(item => (
              <AdditionalItem
                key={item.slug ? item.slug : item.name}
                item={item}
                menuPosition={menuPosition}
                isSelected={
                  currentSlug &&
                  currentSlug.includes(item.slug) &&
                  item.slug !== '/'
                }
              />
            ))}
        </ul>
      </nav>
    </Container>
  )
}

Menu.propTypes = {
  /** Departments to be shown in menu */
  departments: PropTypes.arrayOf(itemPropType),
  /** Categories to be shown in menu */
  categories: PropTypes.arrayOf(itemPropType),
  /** Title to show all departments tab */
  departmentsTitle: PropTypes.string,
  /** Indicates if the departments item must be shown */
  showAllDepartments: PropTypes.bool,
  /** Number of the subcategory levels of the menu */
  subcategoryLevels: PropTypes.number,
  /** Indicates the menu position */
  menuPosition: PropTypes.oneOf(getMenuPositionValues()),
  /** Additional Items to be shown in menu */
  additionalItems: PropTypes.arrayOf(itemPropType),
}

export default Menu
