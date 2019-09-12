import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import * as Amp from 'react-amphtml'
import { useRuntime, Link } from 'vtex.render-runtime'
import { IconMinus, IconPlus } from 'vtex.store-icons'

import styles from '../categoryMenu.css'

const getLinkParams = linkValues => {
  const [department, category, subcategory] = linkValues
  const params = { department }

  if (category) params.category = category
  if (subcategory) params.subcategory = subcategory

  const page = category
    ? subcategory
      ? 'store.search#subcategory'
      : 'store.search#category'
    : 'store.search#department'

  return { page, params }
}

const getDepartmentParams = linkValues => {
  const [department] = linkValues
  const params = { department }
  const page = 'store.search#department'

  return { departmentParams: params, departmentPage: page }
}

const SideBarItem = ({
  treeLevel = 1,
  item,
  item: { children },
  showSubcategories,
  onClose,
  linkValues,
}) => {
  const { amp, navigate } = useRuntime()
  const [open, setOpen] = useState(false)

  const subCategoriesVisible =
    showSubcategories && children && children.length > 0

  const { page, params } = getLinkParams(linkValues)
  const { departmentPage, departmentParams } = getDepartmentParams(linkValues)

  const navigateToPage = () => {
    navigate({
      page,
      params,
      fallbackToWindowLocation: false,
    })
    onClose()
  }

  const handleDepartmentClick = () => {
    navigate({
      page: departmentPage,
      params: departmentParams,
      fallbackToWindowLocation: false,
    })
    onClose()
  }

  const handleItemClick = () => {
    if (subCategoriesVisible) {
      setOpen(prevOpen => !prevOpen)
    } else {
      navigateToPage()
    }
  }

  const titleContainerClasses = classNames(
    styles.sidebarItemContainer,
    'flex justify-between items-center pa5 pointer list ma0'
  )

  const titleClasses = classNames('ma0 t-body w-auto', {
    'lh-solid': treeLevel === 1,
  })

  const caretClasses = treeLevel === 1 ? 'c-on-base' : 'c-muted-3'

  const sideBarItemClasses = classNames(
    styles.sidebarItem,
    'list pa0 ma0 bg-base',
    {
      'c-muted-2 t-body pl4': treeLevel > 1,
      'c-on-base': treeLevel === 1,
    }
  )

  if (amp) {
    const titleContent = (
      <>
        <h2 className={titleClasses}>{item.name}</h2>
        {subCategoriesVisible && (
          <span className={caretClasses}>
            <div className={classNames('dn', styles.iconOpen)}>
              <IconPlus size={16} />
            </div>
            <div className={classNames('dn', styles.iconClose)}>
              <IconMinus size={16} />
            </div>
          </span>
        )}
      </>
    )

    return (
      <section className={sideBarItemClasses}>
        <div className="bn bg-base pa0">
          {!subCategoriesVisible ? (
            <Link className={`${titleContainerClasses} link`}>
              {titleContent}
            </Link>
          ) : (
            <div className={titleContainerClasses}>{titleContent}</div>
          )}
        </div>
        <div>
          {subCategoriesVisible && (
            <Fragment>
              <Link
                className="pa5 pointer t-body c-muted-2 ma0 list db"
                page={departmentPage}
                params={departmentParams}
              >
                <FormattedMessage id="store/category-menu.all-category.title">
                  {txt => <span className="pl4">{txt}</span>}
                </FormattedMessage>
              </Link>
              <Amp.AmpAccordion>
                {children.map(child => (
                  <SideBarItem
                    key={child.id}
                    item={child}
                    showSubcategories={showSubcategories}
                    linkValues={[...linkValues, child.slug]}
                    treeLevel={treeLevel + 1}
                  />
                ))}
              </Amp.AmpAccordion>
            </Fragment>
          )}
        </div>
      </section>
    )
  }

  return (
    <ul className={sideBarItemClasses}>
      <li className={titleContainerClasses} onClick={handleItemClick}>
        <span className={titleClasses}>{item.name}</span>
        {subCategoriesVisible && (
          <span className={caretClasses}>
            {open ? <IconMinus size={16} /> : <IconPlus size={16} />}
          </span>
        )}
      </li>
      {subCategoriesVisible && open && (
        <Fragment>
          <li
            className="pa5 pointer t-body c-muted-2 ma0 list"
            onClick={handleDepartmentClick}
          >
            <FormattedMessage id="store/category-menu.all-category.title">
              {txt => <span className="pl4">{txt}</span>}
            </FormattedMessage>
          </li>
          {children.map(child => (
            <li key={child.id} className="list ma0 pa0">
              <SideBarItem
                showSubcategories={showSubcategories}
                item={child}
                linkValues={[...linkValues, child.slug]}
                onClose={onClose}
                treeLevel={treeLevel + 1}
              />
            </li>
          ))}
        </Fragment>
      )}
    </ul>
  )
}

SideBarItem.propTypes = {
  /** Sidebar's item. */
  item: PropTypes.object.isRequired,
  /** Link values to create the redirect. */
  linkValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Closes sidebar. */
  onClose: PropTypes.func.isRequired,
  /** Tree level. */
  treeLevel: PropTypes.number,
  /** Whether to show subcategories or not */
  showSubcategories: PropTypes.bool,
}

export default SideBarItem
