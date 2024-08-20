// src/hooks/useCategory.js
import { useState, useCallback, useEffect, useMemo } from 'react';
import { fetchCategories, createOrUpdateCategory, updateCategoryStatus, deleteCategory } from '../stores/storeCategory';
import { Avatar, notification, Tag } from 'antd';
import { CustomSwitch, DeleteButton, EditButton, showDialogConfirm } from '../components';

const useCategory = () => {
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
const [selectedItem, setSelectedItem] = useState(null);
const [modalVisible, setModalVisible] = useState(false);
const [filters, setFilters] = useState({ name: '', active: '' });
const [confirmLoading, setConfirmLoading] = useState(false);

const formFieldsMainCategories = [
    {
      name: 'name',
      label: 'اسم القسم',
      type: 'text',
      rules: [{ required: true, message: 'الرجاء إدخال اسم القسم!' }],
    },
    {
      name: 'description',
      label: 'الوصف',
      type: 'text',
      rules: [{ required: false }],
    }
    ];

const fetchData = useCallback(async (params = {}) => {
    setLoading(true);
    try {
    const result = await fetchCategories({ ...params, ...filters });
    setData(result.data);
    setPagination(prev => ({ ...prev, total: result.total }));
    } catch (error) {
        // notification.error({
        //     message: 'Error',
        //     description: error.message,
        // });   
    } finally {
    setLoading(false);
    }
}, [filters]);

useEffect(() => {
    fetchData({ page: pagination.current, Records_Number: pagination.pageSize });
}, [fetchData, pagination.current, pagination.pageSize]);

const handleFilterChange = (key,value) => {
    console.log(value)
    setFilters(prev => ({ ...prev, [key]: value }));
    fetchData({ page: 1, pageSize: pagination.pageSize });
};

const showModal = (category) => {
    setSelectedItem(category);
    setModalVisible(true);
};

const handleDelete = async (id) => {
    setConfirmLoading(true);
    try {
    await deleteCategory(id);
    fetchData({ page: pagination.current, pageSize: pagination.pageSize });
    // notification.success({
    //     message: 'Success',
    //     description: 'Category deleted successfully.',
    // });
    } catch (error) {
    // notification.error({
    //     message: 'Error',
    //     description: error.message,
    // });
    } finally {
    setConfirmLoading(false);
    }
};

const MainCategoriesColumns =   useMemo(() => [
    {
        title:"الصورة",
        dataIndex: "image_url",
        render: (text)=>{
            return (
                    <Avatar
                    src={text}
                    shape="square"
                    style={{ width: '30%', height: '30%', objectFit: 'cover' }}
                    />
            )
        },
        align:'center',
        className:'w-[200px]  max-h-[200px]'
    },
    {
        title: "الاسم",
        dataIndex: "name",
        align:'center',
    },
    {
        title: "الوصف",
        dataIndex: "description",
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
], [handleDelete, showModal]);

const handleStatusChange = async (id, active) => {
    try {
    await updateCategoryStatus(id, !active);
    fetchData({ page: pagination.current, pageSize: pagination.pageSize });
    // notification.success({
    //     message: 'Success',
    //     description: 'Category status updated successfully.',
    // });
    } catch (error) {
    // notification.error({
    //     message: 'Error',
    //     description: error.message,
    // });
    }
};

const handleCreateOrUpdate = useCallback(async (formData) => {
    setLoading(true);
    try {
    await createOrUpdateCategory(formData, !!selectedItem);
    fetchData({ page: pagination.current, Records_Number: pagination.pageSize });
    // notification.success({
    //     message: 'Success',
    //     description: 'Category status created successfully.',
    // });
    } catch (error) {
        // notification.error({
        //     message: 'Error',
        //     description: error.message,
        // });
    } finally {
    setLoading(false);
    setModalVisible(false);
    setSelectedItem(null);
    }
}, [fetchData, pagination, selectedItem]);

const handleCancel = useCallback(() => {
    setModalVisible(false);
    setSelectedItem(null);
}, []);

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

return {
    data,
    loading,
    pagination,
    selectedItem,
    modalVisible,
    showModal,
    handleCancel,
    handleCreateOrUpdate,
    handleDelete,
    handleTableChange,
    onPageChange,
    handleStatusChange,
    handleFilterChange,
    MainCategoriesColumns,
    formFieldsMainCategories
};
};

export default useCategory;
