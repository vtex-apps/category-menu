import React from 'react'

import SideBarItem from './SideBarItem'

const Accordeon = ({
  styles,
  departments,
  onClose,
  showSubcategories
}) => {
  return (
    <ul className={`${styles.sidebarContent} pb7 list ma0 pa0`}>
      {departments.map(department => (
        <li key={department.id} className="list ma0 pa0">
          <SideBarItem
            item={department}
            linkValues={[department.slug]}
            onClose={onClose}
            showSubcategories={showSubcategories}
          />
        </li>
      ))}
    </ul>
  )
}

export default Accordeon
