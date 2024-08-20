// src/pages/MainCategory.js
import { CustomSelect, DataPagination, DataTable, GeneralModal, Header } from '../components';
import {  statusOptions } from '../data/dummy';
import useCategory from '../hooks/useCategory';

const MainCategory = () => {
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
    MainCategoriesColumns,
    formFieldsMainCategories
  } = useCategory();

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
        onChange={handleFilterChange}
        options={statusOptions} />
      </Header>
      <GeneralModal
      formItemLayout={
        {layout:'vertical'}
      }
        visible={modalVisible}
        onClose={handleCancel}
        loading={loading}
        item={selectedItem}
        onSave={handleCreateOrUpdate}
        formFields={formFieldsMainCategories}
        title={selectedItem ? "تعديل القسم" : "إنشاء قسم جديد"}
      />
      <div className='m-4'>
        <DataTable
          bordered
          columns={MainCategoriesColumns}
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
  );
};

export default MainCategory;
