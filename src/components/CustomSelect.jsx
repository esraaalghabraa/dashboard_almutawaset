import { Select } from 'antd';

const CustomSelect = ({ placeholder, onKeyDown, loading=false, options, className, dropdownClassName, onChange, ...props}) => {
        return(
                <Select
                loading={loading}
                placeholder={placeholder}
                className={`w-48 ${className}`} 
                popupClassName={`text-md ${dropdownClassName}`}
                onChange={onChange}
                onKeyDown={onKeyDown}
                allowClear
                options={options}
                {...props}
                />
        )
}

export default CustomSelect