import React, { useEffect } from 'react'
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
import { UserRole } from '../../enums/userRole'

const Dashboard = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [totalEmployees, latestEmployees, departmentDistribution] =
        useAppSelector((state) => [
            state.dashboard.totalEmployees,
            state.dashboard.latestEmployees,
            state.dashboard.departmentDistribution,
        ])
    const [user] = useAppSelector((state) => [state.auth.user])
    useEffect(() => {
        dispatch(dashboardActions.reset())
        dispatch(commonActions.reset())
        dispatch(getTotalEmployees())
        dispatch(getLatestEmployees())
        dispatch(countByDepartment())
    }, [])
    useEffect(() => {
        if (!user) {
            navigate(`/${ROUTES.LOGIN}`, { replace: true })
        }
        if (user?.role !== UserRole.Admin) {
            navigate(`/${ROUTES.UNATHORIZED}`, { replace: true })
        }
    }, [user])
    return (
        <DashboardOverview
            totalEmployees={totalEmployees}
            latestEmployees={latestEmployees}
            departmentDistribution={departmentDistribution}
        />
    )
}

export default Dashboard
