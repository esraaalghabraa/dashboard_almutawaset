import React from 'react'
import useSub2Category from '../hooks/useSub2Category';
import { CustomSelect, DataPagination, DataTable, GeneralModal, Header } from '../components';
import { statusOptions } from '../data/dummy';
import Sub2Modal from '../components/Sub2Modal';

const Sub2Category = () => {
    const {
        data,
        loading,
        pagination,
        selectedItem,
        modalVisible,
        showModal,
        handleCancel,
        handleCreateOrUpdate,
        handleTableChange,
        onPageChange,
        handleFilterChange,
        Sub2CategoriesColumns,
        formFieldsSub2Categories,
        sub1Categories,
        categories,
        loadingSelectMainCategory,
        loadingSelectSub1Category
      } = useSub2Category();

  return (
    <div>
      <Header
          buttonText="قسم جديد"
          onClickButton={() => showModal(null)}
          withFilter={true}
          searchInputs={[
            {
              searchPlaceholder:"اسم القسم",
              onSearch: (value) => handleFilterChange('name', value),
            }
          ]}
          >
          <CustomSelect placeholder="الحالة" 
          onChange={(value) => handleFilterChange('active', value)}
          options={statusOptions}
          />
          <CustomSelect placeholder="أقسام المستوى الأول" 
          onChange={(value) => handleFilterChange('category1_id', value)}
          loading={loadingSelectMainCategory}
          options={categories} />
          <CustomSelect placeholder="أقسام المستوى الثاني" 
          onChange={(value) => handleFilterChange('category2_id', value)}
          loading={loadingSelectSub1Category}
          options={sub1Categories} />
      </Header>
      {/* <GeneralModal
        visible={modalVisible}
        onClose={handleCancel}
        item={selectedItem}
        onSave={handleCreateOrUpdate}
        formFields={formFieldsSub2Categories}
        title={selectedItem ? "تعديل القسم" : "إنشاء قسم جديد"}
      /> */}
      <Sub2Modal
      visible={modalVisible}
      onClose={handleCancel}
      item={selectedItem}
      onSave={handleCreateOrUpdate}
      formFields={formFieldsSub2Categories}
      />
      <div className='m-4'>
        <DataTable
          bordered
          columns={Sub2CategoriesColumns}
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

export default Sub2Category
