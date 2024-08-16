import React, { useState } from "react";
import { Input } from "antd";
import { IoSearch } from "react-icons/io5";
import debounce from 'lodash.debounce';

const SearchInput = ({ hint, onSearch }) => {
    const [searchValue, setSearchValue] = useState('');
    const debouncedSearch = debounce(onSearch, 300);

    const handleSearchClick = () => {
        debouncedSearch(searchValue);
    };

    const handleClearInput = () => {
        setSearchValue('');
        onSearch(''); 
    };

    return (
        <div className="hover:bg-primary-50 rounded-md">
            <Input
            value={searchValue}
            onChange={(e) => {
                if(e.target.value === ''){
                    handleClearInput()
                }else{
                setSearchValue(e.target.value)
            }
            }} // Update the state with the input value
            onPressEnter={(e) => onSearch(e.target.value)}
            placeholder={hint}
            addonBefore={
                <IoSearch
                    className="hover:text-primary-500"
                    style={{ cursor: 'pointer' }} // Change cursor to pointer
                    onClick={handleSearchClick} // Call search when icon is clicked
                />
            }
        />
        </div>
    );
};

export default SearchInput;
