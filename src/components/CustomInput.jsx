
import { Input } from "antd";
import React from 'react';


export const CustomInput = ({hint, className, addonBefore, type, ref, size, style}) => {
    return(
    <Input
        size={size}
        style={style}
        addonBefore={addonBefore}
        placeholder={hint}
        className={className}
    />
    )
}