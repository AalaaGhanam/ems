import React, { useEffect } from 'react'
import { Layout } from 'antd'
import DepartmentForm from '../../components/Department/DepartmentForm'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getAllDepartments } from '../../store/dashboard/DashboardActions'
import { DepartmentPropsTypes } from '../../models/department.model'
import DepartmentList from '../../components/Department/DepartmentList'
import { ROUTES } from '../../enums/routes'
import { useNavigate } from 'react-router-dom'

const Departments: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [departments] = useAppSelector((state) => [
        state.dashboard.departments,
    ])
    useEffect(() => {
        dispatch(getAllDepartments())
    }, [])

    const userReduxState = useAppSelector((state) => state.auth)
    useEffect(() => {
        if (!userReduxState.user) {
            navigate(`/${ROUTES.LOGIN}`, { replace: true })
        }
    }, [userReduxState])
    return (
        <>
            <DepartmentForm /> <br />
            <DepartmentList
                departments={departments as DepartmentPropsTypes[]}
            />
        </>
    )
}

export default Departments
