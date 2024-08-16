import { NavLink } from "react-router-dom";

const NavLinkSubMenuItem = ({link, activeLink, handleCloseSideBar}) => {
    return(
      <NavLink
        onClick={handleCloseSideBar}
        to={`/${link.path}`}
        className={({ isActive }) =>
          `${activeLink} ${isActive ? ' text-primary-500 bg-primary-100' : 'hover:bg-primary-100'}`
        }
      >
        <span className="capitalize">{link.title}</span>
    </NavLink>
    );
  }
  export default NavLinkSubMenuItem;