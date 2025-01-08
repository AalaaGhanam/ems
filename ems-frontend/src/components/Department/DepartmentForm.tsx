import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { addDepartment } from '../../store/dashboard/DashboardActions'
import { DepartmentDto } from '../../dtos/department.dto'
import { ROUTES } from '../../enums/routes'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../../store/hooks'
import { useTranslation } from 'react-i18next'

const DepartmentForm: React.FC = () => {
    const { t } = useTranslation()

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [messageApi, contextHolder] = message.useMessage()

    const onFinish = async (values: any) => {
        const department: DepartmentDto = values
        try {
            await dispatch(addDepartment(department)).unwrap()
            navigate(`/${ROUTES.DEPARTMENTS}`, { replace: true })
            messageApi.open({
                key: values.Name,
                type: 'success',
                content: `${values.Name} ${t('DASHBOARD.SUCCESS.MESSAGE')}`,
                duration: 2,
            })
        } catch (error) {}
    }

    return (
        <>
            {contextHolder}
            <Form onFinish={onFinish} layout="vertical">
                <Form.Item
                    label={t('DASHBOARD.DEPARTMENT.NAME')}
                    name="Name"
                    rules={[
                        {
                            required: true,
                            message: t('DASHBOARD.FORM.MESSAGE'),
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    {t('DASHBOARD.BUTTON.SAVE')}
                </Button>
            </Form>
        </>
    )
}

export default DepartmentForm
