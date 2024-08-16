import React from 'react'
import { NavLink } from 'react-router-dom'

const NavLinkItem = ({item, activeLink, handleCloseSideBar}) => {
  return (
    <NavLink
    onClick={handleCloseSideBar}
    to={`/${item.path}`}
    key={item.title}
    className={({ isActive }) =>
      `${activeLink} ${isActive ? ' text-primary-600 bg-primary-100' : 'hover:bg-primary-100'}`
    }
  >
    {item.icon}
    {item.title}
  </NavLink>
  )
}

export default NavLinkItem
