import { useState, useCallback, useEffect, useMemo } from 'react';
import { Avatar, notification, Tag } from 'antd';
import { CustomSwitch, showDialogConfirm } from '../components';
import { fetchAds, fetchStoresAsPairs, updateAdStatus } from '../stores/storeAd';
import { fetchCategoriesAsPairs } from '../stores/storeCategory';
import { fetchSub1CategoriesAsPairs } from '../stores/storeSub1Category';
import { fetchSub2CategoriesAsPairs } from '../stores/storeSub2Category';

const useAd = () => {

const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
const [filters, setFilters] = useState({ name: '', active: '' , category2_ids: undefined});
const [mainCategoryId, setMainCategoryId]= useState(null);
const [sub1CategoryId, setSub1CategoryId]= useState(null);
const [sub1CategoryIds, setsub1CategoryIds]= useState({ category2_ids: []});

const [stores, setStores] = useState([]);
const [categories, setCategories] = useState([]);
const [sub1Categories, setSub1Categories] = useState([]);
const [sub2Categories, setSub2Categories] = useState([]);

const [loadingSelectMainCategory, setLoadingSelectMainCategory] = useState(true);
const [loadingSelectSub1Category, setLoadingSelectSub1Category] = useState(false);
const [loadingSelectSub2Category, setLoadingSelectSub2Category] = useState(false);
const [loadingSelectStores, setLoadingSelectStores] = useState(false);

useEffect(() => {
    const loadCategories = async () => {
        try {
            const result = await fetchCategoriesAsPairs();
            console.log(result)
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


useEffect(() => {
    // Check if filters.category1_id is defined (not undefined or null)
    if (sub1CategoryId) {
        setLoadingSelectSub2Category(true);
        const loadCategories = async () => {
            try {
                const result = await fetchSub2CategoriesAsPairs(sub1CategoryId);
                const sub2CategoriesData = result.map((option) => ({
                    value: option.id,
                    label: option.name,
                }));
                setSub2Categories(sub2CategoriesData);
            } catch (error) {
                notification.error({
                    message: 'Error',
                    description: error.message,
                });
            } finally {
                setLoadingSelectSub2Category(false); // End loading state
            }
        };

        loadCategories();
    } else {
        // If category1_id is undefined, optionally clear sub1Categories
        setSub2Categories([]);
    }
}, [sub1CategoryId]);


useEffect(() => {
    if (sub1CategoryIds.category2_ids.length > 0) {
        setLoadingSelectStores(true);
        const loadStores = async () => {
            try {
                const result = await fetchStoresAsPairs({ ...sub1CategoryIds });
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
}, [sub1CategoryIds.category2_ids]);

const fetchData = useCallback(async (params = {}) => {
    setLoading(true);
    try {
    const result = await fetchAds({ ...params, state: 2, ...filters });
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

const handleFilterChange = (key, value) => {
    if (key === 'category1_id') {
        setMainCategoryId(value);
    } else if (key === 'category2_id') {
        setSub1CategoryId(value);
    } else if (key === 'category2_ids') {
        setsub1CategoryIds(prev => ({ ...prev, [key]: value }));
    } else {
        setFilters(prev => ({ ...prev, [key]: value }));
        fetchData({ page: 1, pageSize: pagination.pageSize });
    }
};


const expandedColumns = useMemo(() => [
    {
        title: "تصنيف المستوى الثالث",
        dataIndex: "category3",
        render: (category3) => category3?.name || 'N/A',
        align: 'center',
    },
    {
        title: "السعر الخاص",
        dataIndex: "special_price",
        align: 'center',
    },
    {
        title: "الوصف",
        dataIndex: "description",
        align: 'center',
    },
    {
        title: "المتجر",
        dataIndex: "store",
        render: (store) => store?.name || 'N/A',
        align: 'center',
    },
], []);

const AdsColumns =   useMemo(() => [
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
        title: "السعر",
        dataIndex: "price",
        align: 'center',
    },
    {
        title: 'الحالة',
        dataIndex: 'active',
        key: 'active',
        align: 'center',
        render: (active) => (
            <Tag 
            color={active === 2 || active === 4 ? 'red' :
            (active === 0 ? 'green':(active === 3 ? 'blue':(active === 1 ?'purple':'gray')))}>
            {active === 2 || active === 4 ? 'غير مفعل' :
            (active === 0 ? 'مفعل':(active === 3 ? 'محذوف من قبل التاجر':(active === 1 ?'غير مفعلة من قبل التاجر':'غير معروفة')))}
            </Tag>
        ),
        onFilter: (value, record) => record.active === value,
        filters: [
            { text: 'مفعل', value: 0 },
            { text: 'غير مفعل', value: 2 },
            { text: 'غير مفعل من قبل التاجر', value: 1 },
            { text: 'محذوف من قبل التاجر', value: 3 },
        ],
    },
    {
        title: "العمليات",
        dataIndex: "actions",
        align: 'center',
        render: (text, record) => (
            <div className="flex items-center justify-center gap-4 ">
            <CustomSwitch
                colorPrimary={(record.active === 2 || record.active === 4) ? 'red' :
                    (record.active === 0 ? 'green':(record.active === 3 ? 'blue':(record.active === 1 ?'purple':'gray')))}
                active = {record.active === 2 || record.active === 4  ? 0 : 1}
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
], []);


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
    const activeAd = active === 2 || active === 4  ? 1 : 0
    await updateAdStatus(id, activeAd);
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
    AdsColumns,
    sub1Categories,
    sub2Categories,
    stores,
    categories,
    mainCategoryId,
    setMainCategoryId,
    loadingSelectMainCategory,
    loadingSelectSub1Category,
    loadingSelectSub2Category,
    loadingSelectStores,
    expandedColumns,
    sub1CategoryIds
};
}

export default useAd
