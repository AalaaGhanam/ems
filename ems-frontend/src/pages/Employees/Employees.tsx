import React, { useEffect } from 'react'
import { Tabs } from 'antd'
import EmployeeForm from '../../components/Employee/EmployeeForm'
import EmployeeList from '../../components/Employee/EmployeeList'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
    getAllDepartments,
    getAllEmployees,
} from '../../store/dashboard/DashboardActions'
import { Employee } from '../../models/employee.model'
import { Department } from '../../models/department.model'
import { ROUTES } from '../../enums/routes'
import { useNavigate } from 'react-router-dom'
import TabPane from 'antd/es/tabs/TabPane'
import { useTranslation } from 'react-i18next'

const Employees: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { t } = useTranslation()

    const [employees, departments] = useAppSelector((state) => [
        state.dashboard.employees,
        state.dashboard.departments,
    ])
    const userReduxState = useAppSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getAllEmployees())
        dispatch(getAllDepartments())
    }, [])

    useEffect(() => {
        if (!userReduxState.user) {
            navigate(`/${ROUTES.LOGIN}`, { replace: true })
        }
    }, [userReduxState])

    return (
        <Tabs type="card">
            <TabPane tab={t('DASHBOARD.EMPLOYEES.LIST')} key={2}>
                <EmployeeList employees={employees as Employee[]} />
            </TabPane>
            <TabPane tab={t('DASHBOARD.EMPLOYEES.CREATE')} key={1}>
                <EmployeeForm departments={departments as Department[]} />
            </TabPane>
        </Tabs>
    )
}

export default Employees
