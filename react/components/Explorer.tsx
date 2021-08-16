import React, { useState } from 'react'
import _get from 'lodash/get'
import _initial from 'lodash/initial'
import { Link } from 'vtex.render-runtime'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'

const CSS_HANDLES = [
  'menuItemId',
  'menuItemSlug',
  'menuItemBack',
  'menuitemSeeAll',
]

const Explorer = ({ styles, departments, onClose }) => {
  // const runtime = useRuntime()
  const [currentPath, setCurrentPath] = useState<any[]>([])
  const handles = useCssHandles(CSS_HANDLES)

  const updatePath = (key) => {
    setCurrentPath([...currentPath, key, 'children'])
  }

  const goBack = () => {
    setCurrentPath(currentPath.slice(0, currentPath.length - 2))
  }

  const activeDepartments = currentPath.length
    ? _get(departments, currentPath)
    : departments

  const currentDepartment = _get(departments, _initial(currentPath))

  return (
    <ul className={`${styles.sidebarContent} pb7 list ma0 pa0`}>
      {Boolean(currentPath.length) && (
        <>
          <li
            className={`${handles.menuItemBack} list ma0 pa5 pointer pv3`}
            onClick={goBack}
          >
            <FormattedMessage id="store/category-menu.explorer.back" />
          </li>
          <li className={`${handles.menuItemSeeAll} list ma0 pa5 pv3`}>
            <Link
              className="t-body c-muted-2 ma0 list"
              to={currentDepartment.href}
            >
              <FormattedMessage id="store/category-menu.explorer.all-from">
                {(txt) => `${txt} ${currentDepartment.name}`}
              </FormattedMessage>
            </Link>
          </li>
        </>
      )}
      {activeDepartments.map((department, key) => {
        const linkProps = department?.children?.length
          ? {
              onClick: () => updatePath(key),
            }
          : {
              to: department?.href,
              onClick: onClose,
            }

        const classes = classNames(
          applyModifiers(handles.menuItemId, String(department.id)),
          applyModifiers(handles.menuItemSlug, department.slug),
          'list ma0 pa0 pv3'
        )

        return (
          <li key={department.id} className={classes}>
            <Link
              className="pa5 pointer t-body c-muted-2 ma0 list"
              {...linkProps}
            >
              {department.name}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default Explorer
