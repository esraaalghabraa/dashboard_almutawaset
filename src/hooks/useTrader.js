import { Avatar, notification, Tag } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CustomSwitch, showDialogConfirm } from "../components";

import React from 'react'
import { fetchTraders, updateUserStatus } from "../stores/storeUser";

const useTraders = () => {
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
const [filters, setFilters] = useState({ name: '', active: '' , phone: ''});

const fetchData = useCallback(async (params = {}) => {
    setLoading(true);
    try {
    const result = await fetchTraders({ ...params, ...filters });
    setData(result.data);
    setPagination(prev => ({ ...prev, total: result.total }));
    } catch (error) {
        notification.error({
            message: 'Error',
            description: error.message,
        });   
    } finally {
    setLoading(false);
    }
}, [filters]);

useEffect(() => {
    fetchData({ page: pagination.current, Records_Number: pagination.pageSize });
}, [fetchData, pagination.current, pagination.pageSize]);

const handleTableChange = useCallback((pagination) => {
    setPagination({
    ...pagination,
    current: pagination.current,
    pageSize: pagination.pageSize,
    });
}, []);

const onPageChange = useCallback((page, pageSize) => {
    setPagination(prev => ({
    ...prev,
    current: page,
    pageSize: pageSize,
    }));
}, []);

const handleFilterChange = (key,value) => {
    console.log(value)
    setFilters(prev => ({ ...prev, [key]: value }));
    fetchData({ page: 1, pageSize: pagination.pageSize });
};


const handleStatusChange = async (id, active) => {
    try {
        await updateUserStatus(id, !active);
    fetchData({ page: pagination.current, pageSize: pagination.pageSize });
    notification.success({
        message: 'Success',
        description: 'Trader status updated successfully.',
    });
} catch (error) {
    notification.error({
        message: 'Error',
        description: error.message,
    });
}
};

const TradersColumns = [
    {
        title: "الاسم الأول",
        dataIndex: "f_name",
        align:'center',
    },
    {
        title: "الاسم الثاني",
        dataIndex: "l_name",
        align:'center'
    },
    {
        title: "رقم الهاتف",
        dataIndex: "phone",
        align:'center'
    },
    {
        title: 'الحالة',
        dataIndex: 'active',
        key: 'active',
        align: 'center',
        render: (active) => (
            <Tag color={active ? 'green' : 'red'}>
            {active ? 'مفعل' : 'غير مفعل'}
            </Tag>
        ),
        onFilter: (value, record) => record.active === value,
        filters: [
            { text: 'مفعل', value: 1 },
            { text: 'غير مفعل', value: 0 },
        ],
    },
    {
        title: "العمليات",
        dataIndex: "actions",
        align: 'center',
        render: (text, record) => (
            <div className="flex items-center justify-center gap-4 ">
            <CustomSwitch
            colorPrimary={record.active ? 'green' : 'red'}
            active = {record.active} 
            onChange={() =>
                showDialogConfirm({
                title: 'تأكيد تغيير حالة القسم',
                onOk: () => handleStatusChange(record.id, record.active),
                content: 'هل أنت متأكد أنك تريد تغيير حالة القسم؟',
                })
                }/>
            </div>
        )
    }
]
return {
    data,
    loading,
    pagination,
    handleStatusChange,
    handleFilterChange,
    TradersColumns,
    handleTableChange,
    onPageChange
};
}

export default useTraders
