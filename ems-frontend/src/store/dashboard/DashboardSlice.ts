import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    addDepartment,
    addEmployee,
    countByDepartment,
    deleteEmployee,
    editDepartment,
    getAllDepartments,
    getAllEmployees,
    getLatestEmployees,
    getTotalEmployees,
} from './DashboardActions'
import { Employee } from '../../models/employee.model'
import { Department } from '../../models/department.model'

type DashboardState = {
    totalEmployees: number
    latestEmployees: []
    departmentDistribution: any,
    departments: Department[] | null,
    employees: Employee[] | null
}

const initialState: DashboardState = {
    totalEmployees: 0,
    latestEmployees: [],
    departmentDistribution: null,
    departments: [],
    employees: []
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: { reset: () => initialState },
    extraReducers: (builder) => {
        builder
            .addCase(
                getTotalEmployees.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.totalEmployees = action.payload
                }
            )
            .addCase(
                getLatestEmployees.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.latestEmployees = action.payload
                }
            )
            .addCase(
                countByDepartment.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.departmentDistribution = action.payload
                }
            )
            .addCase(
                addDepartment.fulfilled,
                (state, action: PayloadAction<any>) => {
                    const newDepartments: any = state.departments
                    newDepartments.push(action.payload);
                    state.departments = newDepartments;
                }
            )
            .addCase(
                editDepartment.fulfilled,
                (state, action: PayloadAction<any>) => {
                    const newDepartments: any = [state.departments, action.payload]
                    state.departments = newDepartments;
                }
            )
            .addCase(
                getAllDepartments.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.departments = action.payload
                }
            )
            .addCase(
                addEmployee.fulfilled,
                (state, action: PayloadAction<any>) => {
                    const newEmployees: any = state.employees
                    newEmployees.push(action.payload);
                    state.employees = newEmployees;
                }
            )
            .addCase(
                getAllEmployees.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.employees = action.payload
                }
            )
            .addCase(
                deleteEmployee.fulfilled,
                (state, action: PayloadAction<any>) => {
                    const employees = state.employees;
                    const newEmployees: any = employees?.filter(
                        (item: Employee) => item.Id != action.payload.id
                    )
                    state.employees = newEmployees;
                }
            )
    },
})
export const dashboardActions = dashboardSlice.actions
export default dashboardSlice.reducer
