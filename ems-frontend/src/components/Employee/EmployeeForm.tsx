import React from 'react';
import { Form, Input, Select, Button, DatePicker, message } from 'antd';
import moment from 'moment';
import { useAppDispatch } from '../../store/hooks';
import { Department } from '../../models/department.model';
import { EmployeeDto } from '../../dtos/employee.dto';
import { addEmployee } from '../../store/dashboard/DashboardActions';
import { ROUTES } from '../../enums/routes';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ListProps {
  departments: Department[], 
}

const EmployeeForm = ({departments}: ListProps) => {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [messageApi, contextHolder] = message.useMessage()

  const onFinish =async (values: any) => {
    const department: EmployeeDto = {...values, HireDate: values.HireDate.toString()};
    try {
        await dispatch(addEmployee(department)).unwrap();
        navigate(`/${ROUTES.EMPLOYEES}`, { replace: true });
        messageApi.open({
          key: values.FirstName,
          type: 'success',
          content: `${values.FirstName} ${t('PRODUCT.CART.MESSAGE')}`,
          duration: 2,
      })
    } catch (error) {}
  };

  return (
    <>     {contextHolder}
    {departments?.length>0 ?(<Form onFinish={onFinish} layout="vertical">
      <Form.Item
        label="FirstName"
        name="FirstName"
        rules={[{ required: true, message: 'Please enter the FirstName' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="LastName"
        name="LastName"
        rules={[{ required: true, message: 'Please enter the LastName' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="Email"
        rules={[{ required: true, message: 'Please enter the Email' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Salary"
        name="Salary"
        rules={[{ required: true, message: 'Please enter the Salary' ,}]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="HireDate"
        label={('HireDate')}
        rules={[{ type: 'object', required: true, message: ('Please enter the HireDate') }]}
        getValueProps={(i) => ({ value: moment(i) })}
    >
        <DatePicker
            format='DD/MM/YYYY'
            placeholder='DD/MM/YYYY'
            allowClear={false}
        />
</Form.Item>
      <Form.Item
        label="DepartmentId"
        name="DepartmentId"
        rules={[{ required: true, message: 'Please select the department' }]}
      >
     <Select
      options={departments?.map((item:any) => ( { value: item.Id, label: item.Name } ))}
    />
        
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>):(<>vvv</>)
}
    </>
  );
};

export default EmployeeForm;

function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
