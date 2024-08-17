import { Select } from 'antd';

const CustomSelect = ({ mode,placeholder, onKeyDown, loading=false, options, className='w-48', dropdownClassName, onChange, ...props}) => {
        return(
                <Select
                // showSearch
                // filterOption={(input, option) =>
                // (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                // }
                loading={loading}
                placeholder={placeholder}
                className={className}
                popupClassName={`text-md ${dropdownClassName}`}
                onChange={onChange}
                onKeyDown={onKeyDown}
                allowClear
                options={options}
                {...props}
                mode={mode}
                />
        )
}

export default CustomSelect