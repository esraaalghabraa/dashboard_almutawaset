import React, { useState } from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Input, Modal } from 'antd';
const { confirm } = Modal;
export const showDialogConfirm = ({title='تأكيد الحذف؟',onOk,content}) => {
confirm({
    direction:'rtl',
    title: title,
    icon: <ExclamationCircleFilled />,
    content: content,
    okText: 'نعم',
    okType: 'danger',
    cancelText: 'لا',
    onOk:onOk
});
};
