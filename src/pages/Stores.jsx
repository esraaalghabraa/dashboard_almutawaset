import React from 'react'
import useStore from '../hooks/useStore'
import { CustomSelect, DataPagination, DataTable, GeneralModal, Header } from '../components';
import { statusOptionsAdsAndStores, statusOptionsOrders } from '../data/dummy';
import { MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';

const Stores = ({isStoreRequest}) => {
  const {
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
    handleCancelRejectModel,
  } = useStore(isStoreRequest);

  return (
    <div>
          <Header
          withFilter={true}
          searchInputs={[
            {
              searchPlaceholder:"اسم المتجر",
              onSearch: (value) => handleFilterChange('name', value),
            }
          ]}
          >
          <CustomSelect placeholder="الحالة" 
          onChange={(value) => handleFilterChange(isStoreRequest < 2 ? 'state' : 'active', value)}
          options={isStoreRequest < 2 ? statusOptionsOrders : statusOptionsAdsAndStores} />
          <CustomSelect placeholder="أقسام المستوى الأول" 
          onChange={(value) => handleFilterChange('category1_id', value)}
          loading={loadingSelectMainCategory}
          options={categories} />
          <CustomSelect placeholder="أقسام المستوى الثاني" 
          onChange={(value) => handleFilterChange('category2_ids', value)}
          loading={loadingSelectSub1Category}
          options={sub1Categories} 
          mode="multiple"
          maxTagCount={0}
          />
      </Header>
      <div className='m-4'>
        <DataTable
          expandedRowRender={
            {
              expandedRowRender: (record) => (
                <DataTable
                    bordered
                    columns={expandedColumns}
                    dataSource={[record]}
                    rowKey="id"
                />
            ),
            expandIcon: ({ expanded, onExpand, record }) =>
              expanded ? (
                <MinusCircleTwoTone twoToneColor="#ff4d4f" onClick={e => onExpand(record, e)} />
              ) : (
                <PlusCircleTwoTone twoToneColor="#AE4387" onClick={e => onExpand(record, e)} />
              )
            }
          }
          bordered
          columns={StoresColumns}
          dataSource={data}
          loading={loading}
          onChange={handleTableChange}
          rowKey="id"
        />
        <DataPagination
          pagination={pagination}
          onChange={onPageChange}
        />
      </div>
    </div>
  )
}

export default Stores
