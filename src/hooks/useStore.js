import { useState, useCallback, useEffect, useMemo } from 'react';
import { Avatar, Input, message, notification, Tag } from 'antd';
import { CustomButton, CustomSwitch, DeleteButton, showDialogConfirm } from '../components';
import { fetchCategoriesAsPairs } from '../stores/storeCategory';
import { fetchSub1CategoriesAsPairs } from '../stores/storeSub1Category';
import { acceptStore, deleteRejectStore, fetchStores, fetchStoresAsPairs, rejectStore, updateStoreStatus } from '../stores/storeStore';
import { IoLocationOutline } from 'react-icons/io5';
import { AcceptButton, RejectButton } from '../components/CustomButton';

const useStore = (isStoreRequest) => {
    //statuses
const [data, setData] = useState([]);
const [stores, setStores] = useState([]);
const [loading, setLoading] = useState(false);
const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
const [filters, setFilters] = useState({ name: '', active: '' , category2_ids: []});
const [mainCategoryId, setMainCategoryId]= useState(null);
const [sub1Categories, setSub1Categories] = useState([]);
const [loadingSelectMainCategory, setLoadingSelectMainCategory] = useState(true);
const [loadingSelectSub1Category, setLoadingSelectSub1Category] = useState(false);
const [categories, setCategories] = useState([]);
const [confirmLoading, setConfirmLoading] = useState(false);
const [responseReject, setResponseReject] = useState('');
const [responseAccept, setResponseAccept] = useState('');
const [loadingSelectStores, setLoadingSelectStores] = useState(false);

//get Main Categories
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

//get Sub1 Categories
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

useEffect(() => {
    if (filters.category2_ids.length > 0) {
        setLoadingSelectStores(true);
        const loadStores = async () => {
            try {
                const result = await fetchStoresAsPairs({ ...filters });
                const storesData = result.map((option) => ({
                    value: option.id,
                    label: option.name,
                }));
                setStores(storesData);
            } catch (error) {
                notification.error({
                    message: 'Error',
                    description: error.message,
                });
            } finally {
                setLoadingSelectStores(false); // End loading state
            }
        };
        loadStores();
    } else {
        // If category1_id is undefined, optionally clear sub1Categories
        setStores([]);
    }
}, [filters.category2_ids]);

const fetchData = useCallback(async (params = {}) => {
    setLoading(true);
    try {
    const result = await fetchStores({ ...params, state: isStoreRequest, ...filters });
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
        fetchData({ page: 1, pageSize: pagination.pageSize });
    }
};


const expandedColumns = useMemo(() => [
    {
        title: "اسم التاجر",
        dataIndex: "trader",
        render: (trader) => trader?.name || 'N/A',
        align: 'center',
    },
    {
        title: "تصنيف المستوى الأول",
        dataIndex: "category1",
        render: (trader) => trader?.name || 'N/A',
        align: 'center',
    },
    {
        title: "تصنيفات المستوى الثاني",
        dataIndex: "category2s",
        render: (category2s) => 
            category2s?.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                    {category2s.map((category2, index) => (
                        <li key={category2.name} style={{ marginBottom: '5px' }}>
                            {category2.name}
                        </li>
                    ))}
                </ul>
            ) : 'N/A',
        align: 'center',
    },
    {
        title: "وصف المتجر",
        dataIndex: "description",
        align: 'center',
    },
    {
        title: "وصف الموقع",
        dataIndex: "location",
        align: 'center',
        render: (text, record) => `${record.location_x}, ${record.location_y}`,
    },
], []);

const StoresColumns = useMemo(() => {
    const columns = [
        {
            title: "الصورة",
            dataIndex: "image_url",
            render: (text) => (
                <Avatar
                    src={text}
                    shape="square"
                    style={{ width: '30%', height: '30%', objectFit: 'cover' }}
                />
            ),
            align: 'center',
            className: 'w-[200px] max-h-[200px]',
        },
        {
            title: "الاسم",
            dataIndex: "name",
            align: 'center',
        },
        {
            title: "رقم الهاتف",
            dataIndex: "phone",
            align: 'center',
        },
        {
            title: "المدينة",
            dataIndex: "city",
            align: 'center',
        },
        {
            title: "السوق",
            dataIndex: "market",
            align: 'center',
        },
    ];

    // Conditionally add the "الحالة" (active) column
    if (isStoreRequest === 2) {
        columns.push({
            title: 'الحالة',
            dataIndex: 'active',
            key: 'active',
            align: 'center',
            render: (active) => (
                <Tag
                    color={
                        active === 2 || active === 4
                            ? 'red'
                            : active === 0
                            ? 'green'
                            : active === 3
                            ? 'blue'
                            : active === 1
                            ? 'purple'
                            : 'gray'
                    }
                >
                    {active === 2 || active === 4
                        ? 'غير مفعل'
                        : active === 0
                        ? 'مفعل'
                        : active === 3
                        ? 'محذوف من قبل التاجر'
                        : active === 1
                        ? 'غير مفعلة من قبل التاجر'
                        : 'غير معروفة'}
                </Tag>
            ),
            onFilter: (value, record) => record.active === value,
            filters: [
                { text: 'مفعل', value: 0 },
                { text: 'غير مفعل', value: 2 },
                { text: 'غير مفعل من قبل التاجر', value: 1 },
                { text: 'محذوف من قبل التاجر', value: 3 },
            ],
        });
    }
    // Conditionally add the "الحالة" (status) column
    if (isStoreRequest < 2) {
        columns.push({
            title: 'الحالة',
            dataIndex: 'state',
            key: 'state',
            align: 'center',
            render: (state) => (
                <Tag
                    color={
                        state 
                            ? 'red'
                            : 'blue'
                    }
                >
                    {state
                            ? 'مرفوض'
                            : 'قيد الانتظار'}
                </Tag>
            ),
            onFilter: (value, record) => record.state === value,
            filters: [
                { text: 'مرفوض', value: 1 },
                { text: 'قيد الانتظار', value: 0 },
            ],
        });
    }

    
    columns.push({
        title: "العمليات",
        dataIndex: "actions",
        align: 'center',
        render: (text, record) => (
            <div className="flex items-center justify-center gap-4 ">
                {isStoreRequest === 2 && (
                    <CustomSwitch
                        colorPrimary={
                            record.active === 2 || record.active === 4
                                ? 'red'
                                : record.active === 0
                                ? 'green'
                                : record.active === 3
                                ? 'blue'
                                : record.active === 1
                                ? 'purple'
                                : 'gray'
                        }
                        active={record.active === 2 || record.active === 4 ? 0 : 1}
                        onChange={() =>
                            showDialogConfirm({
                                title: 'تأكيد تغيير حالة القسم',
                                onOk: () => handleStatusChange(record.id, record.active),
                                content: 'هل أنت متأكد أنك تريد تغيير حالة القسم؟',
                            })
                        }
                    />
                )}
                
                <CustomButton
                    type="button"
                    tooltip="انسخ الموقع"
                    icon={<IoLocationOutline />}
                    onClick={() => handlePrintLocation(record.location_x, record.location_y)}
                    className={`text-xl rounded-md p-2 hover:bg-blue-100 text-blue-600`}
                />
                {isStoreRequest === 0 && (
                    <>
                    <RejectButton
                    onClick={() => showDialogConfirm({
                    title: 'تأكيد تغيير حالة القسم',
                    onOk: () => handleReject(record.id, responseReject),
                    content:
                    <>
                    <div>أدخل السبب هنا</div>
                    <Input.TextArea
                        onChange={(e) => {
                            setResponseReject(e.target.value)
                        }}
                    />
                    </>,
                    })} />
                    <AcceptButton
                    onClick={() => showDialogConfirm({
                    title: 'تأكيد تغيير حالة القسم',
                    onOk: () => handleAccept(record.id),
                    content:'هل أنت متأكد من قبول القسم'
                    })} />
                    </>
                )}
                {isStoreRequest === 1 && (
                <>
                <DeleteButton onClick={() => showDialogConfirm({
                    title: 'تأكيد الحذف',
                    onOk: () => handleDelete(record.id),
                    content: 'هل أنت متأكد أنك تريد حذف هذا العنصر؟',
                })} />
                </>
                )}
            </div>
        ),
    });

    return columns;
}, [isStoreRequest]);



const handleReject = async(id, reason) => {
    setConfirmLoading(true);
    try {
    await rejectStore(id, reason);
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

const handleAccept = async(id) => {
    setConfirmLoading(true);
    try {
    await acceptStore(id);
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

const handleDelete = async (id) => {
    setConfirmLoading(true);
    try {
    await deleteRejectStore(id);
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

// const StoresColumns =   useMemo(() => [
//         {
//         title:"الصورة",
//         dataIndex: "image_url",
//         render: (text)=>{
//             return (
//                 <Avatar
//                 src={text}
//                     shape="square"
//                     style={{ width: '30%', height: '30%', objectFit: 'cover' }}
//                     />
//                 )
//             },
//             align:'center',
//             className:'w-[200px]  max-h-[200px]'
//         },
//         {
//         title: "الاسم",
//         dataIndex: "name",
//         align:'center',
//         },
//         {
//         title: "رقم الهاتف",
//         dataIndex: "phone",
//         align: 'center',
//         },
//         {
//         title: "المدينة",
//         dataIndex: "city",
//         align: 'center',
//         },
//         {
//         title: "السوق",
//         dataIndex: "market",
//         align: 'center',
//         },
//         {
//         title: 'الحالة',
//         dataIndex: 'active',
//         key: 'active',
//         align: 'center',
//         render: (active) => (
            
//             <Tag
//             color={
//                 active === 2 || active === 4
//                     ? 'red'
//                     : active === 0
//                     ? 'green'
//                     : active === 3
//                     ? 'blue'
//                     : active === 1
//                     ? 'purple'
//                     : 'gray'
//             }
//         >
//             {active === 2 || active === 4
//                 ? 'غير مفعل'
//                 : active === 0
//                 ? 'مفعل'
//                 : active === 3
//                 ? 'محذوف من قبل التاجر'
//                 : active === 1
//                 ? 'غير مفعلة من قبل التاجر'
//                 : 'غير معروفة'}
//         </Tag>
//         ),
//         onFilter: (value, record) => record.active === value,
//         filters: [
//             { text: 'مفعل', value: 0 },
//             { text: 'غير مفعل', value: 2 },
//             { text: 'غير مفعل من قبل التاجر', value: 1 },
//             { text: 'محذوف من قبل التاجر', value: 3 },
//         ],
//         },
//         {
//         title: "العمليات",
//         dataIndex: "actions",
//         align: 'center',
//         render: (text, record) => (
//             <div className="flex items-center justify-center gap-4 ">
//                 <CustomSwitch
//                     colorPrimary={
//                         record.active === 2 || record.active === 4
//                             ? 'red'
//                             : record.active === 0
//                             ? 'green'
//                             : record.active === 3
//                             ? 'blue'
//                             : record.active === 1
//                             ? 'purple'
//                             : 'gray'
//                     }
//                     active={record.active === 2 || record.active === 4 ? 0 : 1}
//                     onChange={() =>
//                         showDialogConfirm({
//                             title: 'تأكيد تغيير حالة القسم',
//                             onOk: () => handleStatusChange(record.id, record.active),
//                             content: 'هل أنت متأكد أنك تريد تغيير حالة القسم؟',
//                         })
//                     }
//                 />
//                 <CustomButton
//                     type="button"
//                     tooltip="انسخ الموقع"
//                     icon={<IoLocationOutline />}
//                     onClick={() => handlePrintLocation(record.location_x, record.location_y)}
//                     className={`text-xl rounded-md p-2 hover:bg-blue-100 text-blue-600`}
//                 />
//             </div>
//         ),
//         }
// ], []);

    const handlePrintLocation = (location_x, location_y) => {
        const coordinatesString = `${location_x}, ${location_y}`;
        const textArea = document.createElement('textarea');
        textArea.value = coordinatesString;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        message.success('تم نسخ الإحداثيات إلى الحافظة');
    };

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

const handleStatusChange = async (id, active) => {
    try {
    const activeStore = active === 2 || active === 4  ? 1 : 0
    await updateStoreStatus(id, activeStore);
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

return {
    data,
    loading,
    pagination,
    handleTableChange,
    onPageChange,
    handleStatusChange,
    handleFilterChange,
    StoresColumns,
    sub1Categories,
    categories,
    mainCategoryId,
    setMainCategoryId,
    loadingSelectMainCategory,
    loadingSelectSub1Category,
    expandedColumns,
    handleReject,
};
}

export default useStore
