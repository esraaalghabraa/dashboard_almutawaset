import { Pagination } from 'antd'
import React from 'react'

const DataPagination = ({pagination,onChange}) => {
    return (
        <Pagination
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={pagination.total}
        onChange={onChange}
        showSizeChanger
        responsive
        pageSizeOptions={['5', '10', '20', '30']}
        className=" my-10 flex justify-center"
        showTotal={(total) => `اجمالي الأقسام :  ${total}`}
        locale={{
            items_per_page: '',
            jump_to: 'اذهب إلى',
            jump_to_confirm: 'تأكيد',
            page: '',
            prev_page: 'الصفحة السابقة',
            next_page: 'الصفحة التالية',
            prev_5: '5 صفحات سابقة',
            next_5: '5 صفحات تالية',
            prev_3: '3 صفحات سابقة',
            next_3: '3 صفحات تالية',
            }}
        />
    )
}
export default DataPagination