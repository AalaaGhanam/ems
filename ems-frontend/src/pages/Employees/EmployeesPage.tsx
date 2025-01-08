import React, { useEffect } from 'react'
import { Layout } from 'antd'
import EmployeeForm from '../../components/Employee/EmployeeForm'
import SideMenu from '../../components/SideMenu/SideMenu'
import EmployeeList from '../../components/Employee/EmployeeList'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
    getAllDepartments,
    getAllEmployees,
} from '../../store/dashboard/DashboardActions'
import { Employee } from '../../models/employee.model'
import { Department } from '../../models/department.model'

const { Content } = Layout

const Employees: React.FC = () => {
    const dispatch = useAppDispatch()

    const [employees, departments] = useAppSelector((state) => [
        state.dashboard.employees,
        state.dashboard.departments,
    ])

    useEffect(() => {
        dispatch(getAllEmployees())
        dispatch(getAllDepartments())
    }, [])

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <SideMenu />
            <Layout>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        background: '#fff',
                    }}
                >
                    <EmployeeForm departments={departments as Department[]} />
                    <EmployeeList employees={employees as Employee[]} />
                </Content>
            </Layout>
        </Layout>
    )
}

export default Employees
