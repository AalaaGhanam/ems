import React, { useState } from 'react';
import { Table, Input, Button, Space, Popconfirm, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Employee } from '../../models/employee.model';
import { useAppDispatch } from '../../store/hooks';
import { useTranslation } from 'react-i18next';
import { deleteEmployee } from '../../store/dashboard/DashboardActions';

interface ListProps {
  employees: Employee[], 
}

const EmployeeList = ({employees}: ListProps) => {
  const [searchText, setSearchText] = useState('');
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [messageApi, contextHolder] = message.useMessage()

  const handleDelete = async (record: any) => {
      try {
        await dispatch(deleteEmployee(record.Id));
        messageApi.open({
          key: record.FirstName,
          type: 'success',
          content: `${record.FirstName} ${t('PRODUCT.CART.MESSAGE')}`,
          duration: 2,
        })
      } catch (error) {}
  };

  const columns: any = [
    { title: 'FirstName', dataIndex: 'FirstName', key: 'FirstName', sorter: (a: any, b: any) => a.FirstName.localeCompare(b.FirstName) },
    { title: 'LastName', dataIndex: 'LastName', key: 'LastName', sorter: (a: any, b: any) => a.LastName.localeCompare(b.LastName) },
    { title: 'Email', dataIndex: 'Email', key: 'Email' },
    { title: 'DepartmentId', dataIndex: 'DepartmentId', key: 'DepartmentId', sorter: (a: any, b: any) => a.DepartmentId.localeCompare(b.DepartmentId) },
    { title: 'HireDate', dataIndex: 'HireDate', key: 'HireDate', sorter: (a: any, b: any) => a.HireDate.localeCompare(b.HireDate) },
    { title: 'Salary', dataIndex: 'Salary', key: 'Salary', sorter: (a: any, b: any) => a.Salary.localeCompare(b.Salary) },
    { title: 'Department', dataIndex: 'Department', key: 'Department', 
    render: (item: any) => Object.values(item)[1],
    sorter: (a: any, b: any) => a.Department.Name.localeCompare(b.Department.Name) },
    {
      title: 'Action',
      key: 'action',
      // render: () => (
      //   <Space>
      //     <Button type="link">Edit</Button>
      //     <Button type="link" danger>Delete</Button>
      //   </Space>
      // ),
      render: (_: any, record: any) =>
        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
          <Button type="link" danger>Delete</Button>         
        </Popconfirm>
    },
  ];

  return (
    <div>
           {contextHolder}

      <Input
        placeholder="Search employees"
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Table
        dataSource={employees?.filter((item) =>
          item?.FirstName?.toLowerCase().includes(searchText.toLowerCase())
        )}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default EmployeeList;