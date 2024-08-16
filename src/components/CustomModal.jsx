import React from 'react'
import { Modal } from 'antd';

const CustomModal = ({title,className, bodyStyle, visible, confirmLoading, onOk, onCancel, children, footer }) => {
    return (
        <Modal
        title={title}
        open={visible}  
        onOk={onOk}
        confirmLoading={confirmLoading}
        onCancel={onCancel}
        destroyOnClose
        footer={footer}
        styles={{
            body: bodyStyle
        }}
        className={className}
        >
        {children}
        </Modal>
    )
    }

export default CustomModal