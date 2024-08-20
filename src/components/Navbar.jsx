import { TbLayoutSidebarRight } from "react-icons/tb";
import { RiNotification3Line } from "react-icons/ri";
import { useStateContext } from '../context/ContextProvider';
import { NavLink, useLocation } from 'react-router-dom';
import { links } from '../data/dummy';
import { CustomTooltip } from './index';
import { RiLogoutBoxLine } from "react-icons/ri";
import avatar from '../data/avatar6.jpg';
import ApiService from "../data/api_service";
import CustomButton from "./CustomButton";
import { useState } from "react";


export const NavButton = ({ customFunction, icon, title, eventOnMouseEnter, eventOnMouseLeave }) => {
    return (
        <button
            type='button'
            onClick={customFunction}
            onMouseEnter={eventOnMouseEnter}
            onMouseLeave={eventOnMouseLeave}
            className='text-xl rounded-md p-2 hover:bg-primary-100 text-primary-600'
            aria-label={title}
        >
            {icon}
        </button>
    
    );
};

const Navbar = () => {
    const { activeMenu, setActiveMenu, setActiveMenuHover, setShowTooltip , logout } = useStateContext();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const apiLogout = async () => {
        try {
            setLoading(true)
            const result = await ApiService.get({
                subUrl: '/logout',
                needToken: true,
            });
            console.log(result)
            logout()
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false)
    };
    const getTitleFromPath = (path) => {
        for (let link of links) {
            if (link.path === path) {
                return link.title;
            }
            if (link.children) {
                for (let child of link.children) {
                if (child.path === path) {
                    return child.title;
                }
                }
            }
        }
        return null;
        };
    const generateBreadcrumbs = () => {
        const pathnames = location.pathname.split('/').filter(x => x);
        return (
            <nav aria-label="Breadcrumb" className="flex items-center text-gray-600">
                <ol className="flex space-x-2">
                    <li className="flex items-center">
                        <NavLink to="/" className="hover:underline text-gray-500">
                            <span>لوحة التحكم</span>
                        </NavLink>
                        {pathnames.length > 0 && <span className="px-2 text-gray-500">/</span>}
                    </li>
                    {pathnames.map((value, index) => {
                        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                        const title = getTitleFromPath(value);
                        return (
                            <li key={to} className="flex items-center">
                                <NavLink to={to} className={`hover:underline ${location.pathname === to ? ' text-primary-500' : 'text-gray-500'}`}>
                                    <span>{title}</span>
                                </NavLink>
                                {index < pathnames.length - 1 && <span className="px-2 text-gray-500">/</span>}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        );
    };
    return (
        <div className='flex justify-between items-center px-4 py-2 bg-white border-b'>
            <div className="flex items-center gap-2">
                {!activeMenu && 
                <CustomTooltip text="ابقي القائمة ظاهرة">
                    <NavButton 
                    tooltipText="ddd"
                    title={'Menu'} 
                    icon={<TbLayoutSidebarRight />}
                    customFunction={() => 
                    {
                        setActiveMenu(true)
                        setActiveMenuHover(false)
                    }}
                    eventOnMouseEnter={()=>setShowTooltip(true)}
                    eventOnMouseLeave={()=>setShowTooltip(false)}
                    />
                </CustomTooltip>}
                {generateBreadcrumbs()}
            </div>
            <div className="flex items-center gap-4">
                <CustomButton
                icon={<RiNotification3Line />}
                onClick={()=>{console.log('Notifications')}}
                type="botton"
                className='text-xl rounded-md p-2 hover:bg-primary-100 text-primary-600'
                />
                <CustomButton
                loading={loading}
                icon={<RiLogoutBoxLine />}
                onClick={apiLogout}
                type="botton"
                className='text-xl rounded-md p-2 hover:bg-primary-100 text-primary-600'
                />
                <div className='flex items-center gap-2 pe-2 rounded-full'>
                    <img
                        className="rounded-full w-8 h-8"
                        src={avatar}
                        alt="user-profile"
                    />
                    <span className="hidden md:inline-block text-gray-600">إسراء الغبرة</span>
                </div>
            </div>
        </div>
    );
};
export default Navbar;
