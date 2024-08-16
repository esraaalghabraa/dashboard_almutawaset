import React from 'react'
import useTraders from '../hooks/useTrader';
import { CustomSelect, DataPagination, DataTable, Header } from '../components';
import { statusOptions } from '../data/dummy';

const Traders = () => {
    const {
        data,
        loading,
        pagination,
        handleStatusChange,
        handleFilterChange,
        TradersColumns,
        handleTableChange,
        onPageChange
      } = useTraders();

  return (
    <div>
        <Header
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
        <div className='m-4'>
        <DataTable
          bordered
          columns={TradersColumns}
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

export default Traders
