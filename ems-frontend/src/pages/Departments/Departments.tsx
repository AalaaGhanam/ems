import React, { useEffect, useState } from 'react'
import { Layout } from 'antd'
import SideMenu from '../../components/SideMenu/SideMenu'
import DepartmentForm from '../../components/Department/DepartmentForm'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { dashboardActions } from '../../store/dashboard/DashboardSlice'
import { commonActions } from '../../store/common/CommonSlice'
import { getAllDepartments } from '../../store/dashboard/DashboardActions'
import { Department, DepartmentPropsTypes } from '../../models/department.model'
import DepartmentList from '../../components/Department/DepartmentList'

const { Content } = Layout

const Departments: React.FC = () => {
    const dispatch = useAppDispatch()

    const [departments] = useAppSelector((state) => [
        state.dashboard.departments,
    ])
    useEffect(() => {
        dispatch(dashboardActions.reset())
        dispatch(commonActions.reset())
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
                    <DepartmentForm />
                    <DepartmentList
                        departments={departments as DepartmentPropsTypes[]}
                    />
                </Content>
            </Layout>
        </Layout>
    )
}

export default Departments
