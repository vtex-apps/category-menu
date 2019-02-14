import React, { Fragment } from 'react'
import classNames from 'classnames'
import { path } from 'ramda'
import { injectIntl, intlShape } from 'react-intl'
import PropTypes from 'prop-types'

import { Container } from 'vtex.store-components'
import { useRuntime } from 'vtex.render-runtime'

import CategoryItem from './CategoryItem'
import AdditionalItem from './AdditionalItem'
import { itemPropType } from '../propTypes'

import categoryMenu from '../categoryMenu.css'

import categoryMenuDisposition, { getMenuDispositionValues } from '../utils/categoryMenuDisposition'

const Menu = ({
  categories = [],
  departments,
  intl,
  showAllDepartments,
  subcategoryLevels,
  menuDisposition,
  additionalItems,
}) => {
  const departamentPath = path(['route', 'params', 'department'], useRuntime())
  const fullPath = path(['route', 'path'], useRuntime())

  const currentSlug = departamentPath || fullPath

  const desktopClasses = classNames(`${categoryMenu.container} w-100 bg-base dn flex-m`, {
    'justify-start mw9': menuDisposition === categoryMenuDisposition.DISPLAY_LEFT.value,
    'justify-end mw9': menuDisposition === categoryMenuDisposition.DISPLAY_RIGHT.value,
    'justify-center': menuDisposition === categoryMenuDisposition.DISPLAY_CENTER.value,
  })

  return (
    <Container className="justify-center flex">
      <nav className={desktopClasses}>
        <ul className="pa0 list ma0 flex flex-wrap flex-row t-action overflow-hidden h3">
          {showAllDepartments &&
            <CategoryItem
              menuDisposition={menuDisposition}
              subcategoryLevels={subcategoryLevels}
              category={{
                children: categories,
                name: intl.formatMessage({ id: 'category-menu.departments.title' }),
              }}
            />
          }
          {departments.map(category => (
            <Fragment key={category.id}>
              <CategoryItem
                menuDisposition={menuDisposition}
                category={category}
                subcategoryLevels={subcategoryLevels}
                isCategorySelected={currentSlug === category.slug}
              />
            </Fragment>
          ))}
          {additionalItems && additionalItems.map(item => (
            <Fragment key={item.slug ? item.slug : item.name}>
              <AdditionalItem
                item={item}
                menuDisposition={menuDisposition}
                isSelected={currentSlug && currentSlug.includes(item.slug) && item.slug !== '/'}
              />
            </Fragment>
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
  /** Intl to internationalize messages */
  intl: intlShape,
  /** Indicates if the departments item must be shown */
  showAllDepartments: PropTypes.bool,
  /** Number of the subcategory levels of the menu */
  subcategoryLevels: PropTypes.number,
  /** Indicates the menu disposition */
  menuDisposition: PropTypes.oneOf(getMenuDispositionValues),
  /** Additional Items to be shown in menu */
  additionalItems: PropTypes.arrayOf(itemPropType),
}

export default injectIntl(Menu)
