import { Dropdown } from "antd" ;
import React from 'react'
import avatar from '../data/avatar6.jpg';
import { useStateContext } from "../context/ContextProvider";
import { CiLogout } from "react-icons/ci";
import { NavButton } from "./Navbar";


const DropdownSittings = () => {
const { logout } = useStateContext();

    const items = [
            {
            key: '1',
            label: (
                <span className="text-gray-600">تسجيل الخروج</span>
            ),
            icon: <CiLogout className= 'text-primary-600'/>,
            },
        ];
    return (
        <Dropdown
        menu={{
        items,
        }}
        placement="bottomLeft"
        arrow
        >
            <div className='flex items-center gap-2 cursor-pointer pe-2 hover:bg-primary-100 rounded-full'>
            <img
                className="rounded-full w-8 h-8"
                src={avatar}
                alt="user-profile"
            />
            <span className="hidden md:inline-block text-gray-600">إسراء الغبرة</span>
        </div>
    </Dropdown>
    )
}

export default DropdownSittings
