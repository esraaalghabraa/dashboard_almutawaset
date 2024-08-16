import { useStateContext } from '../context/ContextProvider';
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import NavLinkSubMenuItem from './NavLinkSubMenuItem';

const NavLinkSubMenu = ({ item, activeLink }) => {
    const { toggleSubmenu, openSubmenus, handleCloseSideBar } = useStateContext();

    return (
        <>
            <div
                className={`${activeLink} hover:cursor-pointer ${openSubmenus[item.title] ? 'bg-primary-500 text-white' : 'hover:bg-primary-100'}`}
                onClick={() => toggleSubmenu(item.title)}
            >
                {item.icon}
                <span className="flex-grow">{item.title}</span>
                <button>
                    {openSubmenus[item.title] ? <IoIosArrowDown /> : <IoIosArrowBack />}
                </button>
            </div>
            <div
                className={`overflow-hidden transition-max-height duration-300 ease-out ${openSubmenus[item.title] ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                {item.children.map((link) => (
                    <NavLinkSubMenuItem
                        key={link.title}
                        link={link}
                        activeLink={activeLink}
                        handleCloseSideBar={handleCloseSideBar}
                    />
                ))}
            </div>
        </>
    );
};

export default NavLinkSubMenu;
