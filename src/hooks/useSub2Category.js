// src/hooks/useSub2Category.js
import { useState, useCallback, useEffect, useMemo } from 'react';
import {fetchSub1CategoriesAsPairs } from '../stores/storeSub1Category';
import { Avatar, notification, Tag } from 'antd';
import { CustomSwitch, DeleteButton, EditButton, showDialogConfirm } from '../components';
import { createOrUpdateSub2Category, deleteSub2Category, fetchSub2Categories, updateSub2CategoryStatus } from '../stores/storeSub2Category';
import { fetchCategoriesAsPairs } from '../stores/storeCategory';

const useSub2Category = () => {
    const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
const [selectedItem, setSelectedItem] = useState(null);
const [modalVisible, setModalVisible] = useState(false);
const [filters, setFilters] = useState({ name: '', active: '' , category2_id: undefined});
const [mainCategoryId, setMainCategoryId]= useState(null);
const [confirmLoading, setConfirmLoading] = useState(false);
const [sub1Categories, setSub1Categories] = useState([]);
const [loadingSelectMainCategory, setLoadingSelectMainCategory] = useState(true);
const [loadingSelectSub1Category, setLoadingSelectSub1Category] = useState(false);
const [categories, setCategories] = useState([]);

const formFieldsSub2Categories = [
    {
      name: 'name',
      label: 'اسم القسم',
      type: 'text',
      rules: [{ required: true, message: 'الرجاء إدخال اسم القسم!' }],
    },
    {
      name: 'description',
      label: 'الوصف',
      type: 'textarea',
      rules: [{ required: false }],
    },
    {
        name: 'category1_id',
        label: 'أقسام المستوى الأول',
        type: 'select',
    },
    {
        name: 'category2_id',
        label: 'أقسام المستوى الثاني',
        type: 'select',
    },
  ];

  useEffect(() => {
    const loadCategories = async () => {
        try {
            const result = await fetchCategoriesAsPairs();
            const categoriesData = result.map((option)=>({
                label:option.name,
                value:option.id
            }))
            setCategories(categoriesData);
        } catch (error) {
            notification.error({
                message: 'Error',
                description: error.message,
            });   
        } finally {
            setLoadingSelectMainCategory(false);
        }
    };

    loadCategories();
}, []);

useEffect(() => {
    // Check if filters.category1_id is defined (not undefined or null)
    if (mainCategoryId) {
        setLoadingSelectSub1Category(true);
        const loadCategories = async () => {
            try {
                const result = await fetchSub1CategoriesAsPairs(mainCategoryId);
                const sub1CategoriesData = result.map((option) => ({
                    value: option.id,
                    label: option.name,
                }));
                setSub1Categories(sub1CategoriesData);
            } catch (error) {
                notification.error({
                    message: 'Error',
                    description: error.message,
                });
            } finally {
                setLoadingSelectSub1Category(false); // End loading state
            }
        };

        loadCategories();
    } else {
        // If category1_id is undefined, optionally clear sub1Categories
        setSub1Categories([]);
    }
}, [mainCategoryId]);

const fetchData = useCallback(async (params = {}) => {
    setLoading(true);
    try {
    const result = await fetchSub2Categories({ ...params, ...filters });
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

const handleFilterChange = (key,value) => {
    if(key === 'category1_id'){
        setMainCategoryId(value)
    }
    else{
    setFilters(prev => ({ ...prev, [key]: value }));
    fetchData({ page: 1, pageSize: pagination.pageSize });}
};

const showModal = (sub2Category) => {
    setSelectedItem(sub2Category);
    setModalVisible(true);
};

const handleDelete = async (id) => {
    setConfirmLoading(true);
    try {
    await deleteSub2Category(id);
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

const Sub2CategoriesColumns =   useMemo(() => [
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
        title: "تصنيف المستوى الثاني",
        dataIndex: "category2_name",
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
    await updateSub2CategoryStatus(id, !active);
    fetchData({ page: pagination.current, pageSize: pagination.pageSize });
    notification.success({
        message: 'Success',
        description: 'Category status updated successfully.',
    });
    } catch (error) {
    notification.error({
        message: 'Error',
        description: error.message,
    });
    }
};

const handleCreateOrUpdate = useCallback(async (formData) => {
    setLoading(true);
    try {
    await createOrUpdateSub2Category(formData, !!selectedItem);
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
        Sub2CategoriesColumns,
        formFieldsSub2Categories,
        sub1Categories,
        categories,
        mainCategoryId,
        setMainCategoryId,
        loadingSelectMainCategory,
        loadingSelectSub1Category
    }
}

export default useSub2Category
