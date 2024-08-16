import React, { useCallback, useEffect, useState } from 'react'
import { createOrUpdateDeliveryAgent, deleteDeliveryAgent, fetchDeliveryAgents, updateDeliveryAgentStatus } from '../stores/storeDeliveryAgent';
import { notification, Tag } from 'antd';
import { CustomSwitch, DeleteButton, EditButton, showDialogConfirm } from '../components';
import dayjs from 'dayjs';

const useDeliveryAgent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [filters, setFilters] = useState({ name: '', active: '' , phone: ''});
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const formFieldsDeliveryAgents = [
        {
          name: 'f_name',
          label: 'الاسم الأول',
          type: 'text',
          rules: [{ required: true, message: 'الرجاء إدخال اسم القسم!' }],
        },
        {
          name: 'l_name',
          label: 'الاسم الثاني',
          type: 'text',
          rules: [{ required: true, message: 'الرجاء إدخال اسم القسم!' }],
        },
        {
          name: 'phone',
          label: 'رقم الهاتف',
          type: 'text',
          rules: [{ required: true, message: 'الرجاء إدخال اسم القسم!' }],
        },
        {
          name: 'delivery_area',
          label: 'منطقة التوصيل',
          type: 'text',
          rules: [{ required: true, message: 'الرجاء إدخال اسم القسم!' }],
        },
        {
          name: 'address',
          label: 'العنوان',
          type: 'text',
          rules: [{ required: true, message: 'الرجاء إدخال اسم القسم!' }],
        },
        {
          name: 'Birthday',
          label: 'تاريخ الميلاد',
          type: 'DatePicker',
          rules: [{ required: true, message: 'الرجاء إدخال اسم القسم!' }],
        },
        ];

    const fetchData = useCallback(async (params = {}) => {
        setLoading(true);
        try {
        const result = await fetchDeliveryAgents({ ...params, ...filters });
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
            await updateDeliveryAgentStatus(id, !active);
        fetchData({ page: pagination.current, pageSize: pagination.pageSize });
        notification.success({
            message: 'Success',
            description: 'Customer status updated successfully.',
        });
    } catch (error) {
        notification.error({
            message: 'Error',
            description: error.message,
        });
    }
    };

    const showModal = (deliveryAgent) => {
        if (!deliveryAgent) {
            setModalVisible(true);
            return;
        }
        const date = dayjs(deliveryAgent.Birthday);
        deliveryAgent.Birthday = date
        setSelectedItem(deliveryAgent);
        setModalVisible(true);
    };
    
    const handleCancel = useCallback(() => {
        setModalVisible(false);
        setSelectedItem(null);
    }, []);

    const handleCreateOrUpdate = useCallback(async (formData) => {
        setLoading(true);
        try {
        await createOrUpdateDeliveryAgent(formData, !!selectedItem);
        fetchData({ page: pagination.current, Records_Number: pagination.pageSize });
        notification.success({
            message: 'Success',
            description: 'Category status created successfully.',
        });
        } catch (error) {
            notification.error({
                message: 'Error',
                description: error.message,
            });
        } finally {
        setLoading(false);
        setModalVisible(false);
        setSelectedItem(null);
        }
    }, [fetchData, pagination, selectedItem]);
    const handleDelete = async (id) => {
        setConfirmLoading(true);
        try {
        await deleteDeliveryAgent(id);
        fetchData({ page: pagination.current, pageSize: pagination.pageSize });
        notification.success({
            message: 'Success',
            description: 'Category deleted successfully.',
        });
        } catch (error) {
        notification.error({
            message: 'Error',
            description: error.message,
        });
        } finally {
        setConfirmLoading(false);
        }
    };
    const DeliveryAgentColumns = [
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
                <EditButton onClick={() => showModal(record)} />
                <DeleteButton onClick={() => showDialogConfirm({
                    title: 'تأكيد الحذف',
                    onOk: () => handleDelete(record.id),
                    content: 'هل أنت متأكد أنك تريد حذف هذا العنصر؟',
                })} />
                <CustomSwitch active = {record.active} onChange={() =>
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
        DeliveryAgentColumns,
        handleTableChange,
        onPageChange,
        showModal,
        handleCancel,
        modalVisible,
        selectedItem,
        handleCreateOrUpdate,
        formFieldsDeliveryAgents
    };
}

export default useDeliveryAgent
