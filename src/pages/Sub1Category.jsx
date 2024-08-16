import { CustomSelect, DataPagination, DataTable, GeneralModal, Header } from "../components"
import {  statusOptions } from "../data/dummy";
import useSub1Category from "../hooks/useSub1Category";

const Sub1Category = () => {
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
    Sub1CategoriesColumns,
    formFieldsSub1Categories,
    categories
  } = useSub1Category();

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
          options={statusOptions} />
          <CustomSelect placeholder="أقسام المستوى الأول" 
          onChange={(value) => handleFilterChange('category1_id', value)}
          options={categories} />
      </Header>
      <GeneralModal
            formItemLayout={
              {layout:'vertical'}
            }
        visible={modalVisible}
        onClose={handleCancel}
        item={selectedItem}
        onSave={handleCreateOrUpdate}
        formFields={formFieldsSub1Categories}
        title={selectedItem ? "تعديل القسم" : "إنشاء قسم جديد"}
      />
        <div className='m-4'>
        <DataTable
          bordered
          columns={Sub1CategoriesColumns}
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

export default Sub1Category
