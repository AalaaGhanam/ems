import React, { useState } from 'react';
import type { TableProps } from 'antd';
import { Form, Input, InputNumber, Popconfirm, Table, Typography, message } from 'antd';
import { DepartmentPropsTypes } from '../../models/department.model';
import { useAppDispatch } from '../../store/hooks';
import { useTranslation } from 'react-i18next';
import { editDepartment } from '../../store/dashboard/DashboardActions';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: DepartmentPropsTypes;
  index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

interface ListProps {
  departments: DepartmentPropsTypes[], 
}

const DepartmentList = ({departments}: ListProps)  => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  
  const [form] = Form.useForm();
  const [data, setData] = useState(departments);

  const [editingKey, setEditingKey] = useState('');

  const [messageApi, contextHolder] = message.useMessage()

  const isEditing = (record: DepartmentPropsTypes) => record.key === editingKey;

  const edit = (record: Partial<DepartmentPropsTypes> & { key: React.Key }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as DepartmentPropsTypes;

      const newData = [...data];
      const index = newData.findIndex((item) => Number(key) === Number(item.key));
      const department = newData.find((item:any) => Number(item.key) === index)
      try {
        await dispatch(editDepartment({ department: {...department, Name: row.Name}, id: department?.Id } as any)).unwrap();
        messageApi.open({
          key: row.Name,
          type: 'success',
          content: `${row.Name} ${t('PRODUCT.CART.MESSAGE')}`,
          duration: 2,
        })
      } catch (error) {}
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'Name',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: DepartmentPropsTypes) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginInlineEnd: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns: TableProps<DepartmentPropsTypes>['columns'] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DepartmentPropsTypes) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const deptList = data.length > 0 ? data: departments

  return (
    <>
      {contextHolder}
      {deptList?.length > 0 ? (<Form form={form} component={false}>
        <Table<DepartmentPropsTypes>
          components={{
            body: { cell: EditableCell },
          }}
          bordered
          dataSource={deptList}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{ onChange: cancel }}
        />
      </Form>) : (<></>)}
    </>
  );
};

export default DepartmentList;