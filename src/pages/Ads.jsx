import React, { useState } from 'react'
import useAd from '../hooks/useAd'
import { CustomSelect, DataPagination, DataTable, Header } from '../components';
import { statusOptionsAdsAndStores } from '../data/dummy';
import { MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';

const Ads = () => {
  const {
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
    categories,
    loadingSelectMainCategory,
    loadingSelectSub1Category,
    loadingSelectSub2Category,
    expandedColumns,
    stores,
    loadingSelectStores
  } = useAd();

  const [showFilterOptions, setShowFilterOptions] = useState(0);

  return (
    <div>
        <Header
          withFilter={true}
          searchInputs={[
            {
              searchPlaceholder:"اسم المنتج",
              onSearch: (value) => handleFilterChange('name', value),
            }
          ]}
          >
          <CustomSelect placeholder="الحالة" 
          onChange={(value) => handleFilterChange('active', value)}
          options={statusOptionsAdsAndStores} />
          <CustomSelect placeholder="فلترة الإعلانات حسب ..." 
          onChange={(value) => setShowFilterOptions(value)}
          options={[
            { label: 'تصنيف المستوى الثالث', value: 1 },
            { label: 'المتجر', value: 2 },
          ]} />
          {showFilterOptions !== 0 && <CustomSelect placeholder="أقسام المستوى الأول" 
          onChange={(value) => handleFilterChange('category1_id', value)}
          loading={loadingSelectMainCategory}
          options={categories} />}
          {showFilterOptions === 1 && <>
          <CustomSelect placeholder="أقسام المستوى الثاني" 
          onChange={(value) => handleFilterChange('category2_id', value)}
          loading={loadingSelectSub1Category}
          options={sub1Categories} />
          <CustomSelect placeholder="أقسام المستوى الثالث" 
          onChange={(value) => handleFilterChange('category3_id', value)}
          loading={loadingSelectSub2Category  }
          options={sub2Categories} />
          </>}
          {showFilterOptions ===2 && 
          <>
          <CustomSelect placeholder="أقسام المستوى الثاني" 
          onChange={(value) => handleFilterChange('category2_ids', value)}
          loading={loadingSelectSub1Category}
          options={sub1Categories} 
          mode="multiple"
          maxTagCount={0}
          />
          <CustomSelect placeholder="المتاجر" 
          onChange={(value) => handleFilterChange('store_id', value)}
          loading={ loadingSelectStores }
          options={ stores } />
          </>}
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
          columns={AdsColumns}
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

export default Ads
