import { Button, Tooltip } from 'antd'
import React from 'react'
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

export const EditButton = ({  onClick, className }) => {
  return (
    <CustomButton
      tooltip='تعديل'
      icon={<CiEdit />}
      type='button'
      onClick={onClick}
      className={`text-xl rounded-md p-2 hover:bg-blue-100 text-blue-600 ${className}`}
    />
  );
};

export const DeleteButton = ({ onClick, className }) => {
  return (
    <CustomButton
      tooltip='حذف'
      icon={<MdDeleteOutline />}
      type='button'
      onClick={onClick}
      className={`text-xl rounded-md p-2 hover:bg-red-100 text-red-600 ${className}`}
    />
  );
};


const CustomButton = ({onClick, tooltip, type="default", block=false, htmlType="button", icon, text, className= 'items-center gap-2 text-sm rounded-md px-4 py-2 text-white'}) => {
  return (
    <>
    <Tooltip title={tooltip}>
      <Button 
      htmlType = {htmlType}
      block = {block}
      type={type}
      icon={icon}
      onClick={onClick}
      className={className}
      >{text}</Button>
      </Tooltip>
    </>
  )
}

export default CustomButton


/**
 * type, text, icon, size, onClick
 */