import { Table } from 'antd';
import React from 'react';

const DataTable = ({ bordered, expandedRowRender, loading, columns, dataSource, handleTableChange,rowKey }) => {
    return (
    <Table
        expandable={expandedRowRender}
        bordered={bordered}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        loading={loading}
        onChange={handleTableChange}
        className="rounded-lg overflow-hidden"
        rowKey={rowKey}
        />
    );
};

export default DataTable;
