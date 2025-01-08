import React, { useEffect } from 'react'
import { Layout } from 'antd'
import SideMenu from '../../components/SideMenu/SideMenu'
import DashboardOverview from '../../components/DashboardOverview/DashboardOverview'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
    countByDepartment,
    getLatestEmployees,
    getTotalEmployees,
} from '../../store/dashboard/DashboardActions'
import { dashboardActions } from '../../store/dashboard/DashboardSlice'
import { commonActions } from '../../store/common/CommonSlice'
import { ROUTES } from '../../enums/routes'
import { useNavigate } from 'react-router-dom'

const { Content } = Layout

const Dashboard = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [totalEmployees, latestEmployees, departmentDistribution] =
        useAppSelector((state) => [
            state.dashboard.totalEmployees,
            state.dashboard.latestEmployees,
            state.dashboard.departmentDistribution,
        ])
    const userReduxState = useAppSelector((state) => state.auth)

    useEffect(() => {
        dispatch(dashboardActions.reset())
        dispatch(commonActions.reset())
        dispatch(getTotalEmployees())
        dispatch(getLatestEmployees())
        dispatch(countByDepartment())
    }, [])
    useEffect(() => {
        if (!userReduxState.user) {
            navigate(`/${ROUTES.LOGIN}`, { replace: true })
        }
    }, [userReduxState])
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <SideMenu />
            <Layout>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        background: '#f8fdff',
                    }}
                >
                    <DashboardOverview
                        totalEmployees={totalEmployees}
                        latestEmployees={latestEmployees}
                        departmentDistribution={departmentDistribution}
                    />
                </Content>
            </Layout>
        </Layout>
    )
}

export default Dashboard
