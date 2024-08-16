import { IoFilterSharp } from "react-icons/io5";
import { NavButton } from './Navbar';
import SearchInput from "./SearchInput";
import React, { useState } from 'react';
import { Space } from 'antd';
import {CustomButton} from "../components";
import { IoMdAdd } from "react-icons/io";


export const SearchHeader = ({children}) => {
  return(
    <div className="flex items-center gap-4 rounded-md py-2 px-4">
      {children}
    </div>
  )
}

export const FiltterHeader = ({children}) => {
  return(
    <div className="flex flex-wrap items-center gap-y-2 gap-x-2 rounded-md py-2 px-4 transition-transform transform duration-300">
      <Space wrap>
        {children}
      </Space>
    </div>
  )
}

const Header = ({ searchPlaceholder, searchInputs, onSearch, buttonText, children, withFilter, onClickButton }) => {
  const [addFiltter, setAddFiltter] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <SearchHeader>
            {searchInputs.map((input) => (
              <SearchInput
              hint={input.searchPlaceholder} 
              onSearch={input.onSearch} 
              />
            ))}
          {withFilter && (
            <NavButton
              title="Filter"
              icon={<IoFilterSharp />}
              customFunction={() => setAddFiltter(!addFiltter)}
            />
          )}
          </SearchHeader>
        </div>
        {buttonText && (
          <CustomButton
            text={buttonText}
            type="primary"
            onClick={onClickButton}
            icon={<IoMdAdd />}
          />
        )}
      </div>
      {addFiltter && <FiltterHeader>{children}</FiltterHeader>}
    </div>
  );
};

export default Header;