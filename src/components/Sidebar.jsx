import React from 'react';
import NavLinkSubMenu from './NavLinkSubMenu';
import { useStateContext } from '../context/ContextProvider';
import { links } from '../data/dummy';
import NavLinkItem from './NavLinkItem';
import { TbLayoutSidebarRight } from "react-icons/tb";
import { NavButton } from './Navbar';

const Sidebar = () => {
  const { activeMenu, setActiveMenu, activeMenuHover, setActiveMenuHover, screenSize } = useStateContext();
  const activeLink = 'flex items-center gap-5 px-4 py-2 m-3 rounded-lg text-md';
  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  return (
    <div
      className={`fixed ${(activeMenuHover||(!activeMenuHover&&!activeMenu)) ? 'top-11':'top-0'}  right-0 h-screen bg-white shadow-md overflow-auto pb-10 transition-transform transform  ${
        (activeMenu || activeMenuHover) ? '-translate-x-0' : 'translate-x-full'
      } duration-300 `}
      style={{ width: '16rem' }}
      onMouseLeave={()=>{
        if(activeMenuHover){
          setActiveMenuHover(false);
          // setTimeout(() => {
          //   setActiveMenuHover(false);
          // }, 1000);
        }
      }}
    >
        <div className={`flex gap-4 ${activeMenuHover ? 'justify-center':'px-4'} items-center w-full py-2 text-xl bg-gray-100`}>
            {activeMenu && <NavButton
              title={'Menu'}
              icon={<TbLayoutSidebarRight />}
              customFunction={() => setActiveMenu(!activeMenu)}
            />}
          <span className='text-primary-500 font-medium text-md '>المتوسط</span>
        </div>
      <div className='mt-4 mx-2'>
        {links.map((item) => (
          <div key={item.title}>
            {item.children ? (
              <NavLinkSubMenu item={item} activeLink={activeLink} handleCloseSideBar={handleCloseSideBar} />
            ) : (
              <NavLinkItem item={item} activeLink={activeLink} handleCloseSideBar={handleCloseSideBar} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;





