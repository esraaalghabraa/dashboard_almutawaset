import React from 'react'
import { CalendarModal, CustomSelect, DataPagination, DataTable, GeneralModal, Header } from '../components';
import { statusOptions } from '../data/dummy';
import useDeliveryAgent from '../hooks/useDeliveryAgent';


const DeliveryAgents = () => {
    const {
        data,
        loading,
        pagination,
        handleStatusChange,
        handleFilterChange,
        DeliveryAgentColumns,
        handleTableChange,
        onPageChange,
        selectedItem,
        modalVisible,
        showModal,
        handleCancel,
        handleCreateOrUpdate,
        formFieldsDeliveryAgents

    } = useDeliveryAgent();
    

  return (
    <div>
        <Header
            buttonText="عامل توصيل جديد"
            onClickButton={() => showModal(null)}
            withFilter={true}
            searchInputs={[
                {
                    searchPlaceholder:"اسم القسم",
                    onSearch: (value) => handleFilterChange('name', value),
                },
                {
                    searchPlaceholder:"رقم الهاتف",
                    onSearch: (value) => handleFilterChange('phone', value),
                },
            ]}
            >
            <CustomSelect placeholder="الحالة" 
                onChange={(value) => handleFilterChange('active', value)}
                options={statusOptions} 
            />
        </Header>
        <GeneralModal
        formItemLayout={
            {layout:'vertical'}
            }
        withFiles={false}
        visible={modalVisible}
        onClose={handleCancel}
        item={selectedItem}
        onSave={handleCreateOrUpdate}
        formFields={formFieldsDeliveryAgents}
        title={selectedItem ? "تعديل عامل توصيل" : "إنشاء عامل توصيل جديد"}
      />
              <div className='m-4'>
        <DataTable
          bordered
          columns={DeliveryAgentColumns}
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

export default DeliveryAgents
