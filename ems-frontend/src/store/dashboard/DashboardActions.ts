import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../utils'
import config from '../../config'
import { DepartmentDto } from '../../dtos/department.dto'
import { EmployeeDto } from '../../dtos/employee.dto'
import { Department, DepartmentPropsTypes } from '../../models/department.model'

const getTotalEmployees = createAsyncThunk(
    'dashboard/getTotalEmployees',
    async () => {
        const response = await api.get(`${config.apis.totalEmployees}`)
        return response.data
    }
)

const getLatestEmployees = createAsyncThunk(
    'dashboard/getLatestEmployees',
    async () => {
        const response = await api.get(config.apis.latestEmployees)
        return response.data
    }
)

const countByDepartment = createAsyncThunk(
    'dashboard/countByDepartment',
    async () => {
        const response = await api.get(config.apis.countByDepartment)
        return response.data
    }
)

const addDepartment = createAsyncThunk(
    'dashboard/addDepartment',
    async (payload: DepartmentDto) => {
        const response = await api.post(config.apis.departments, payload)
        return response.data
    }
)

const editDepartment = createAsyncThunk(
    'dashboard/editDepartment',
    async (payload: {department : DepartmentDto, id: string}) => {
        console.log('hjhjhjhjhbbb', payload)
        const response = await api.put(config.apis.departments+ '/' + payload.id, payload.department)
        return response.data
    }
)

const getAllDepartments = createAsyncThunk(
    'dashboard/getAllDepartments',
    async () => {
        const response = await api.get(config.apis.departments)
        const departments = response.data;
        const departmentsOriginData: DepartmentPropsTypes[] = await departments?.map((item: Department, i: number) => ({
            key: i.toString(),
            Name: item.Name,
            Id: Number(item.Id),
        }));
        return departmentsOriginData
    }
)

const addEmployee = createAsyncThunk(
    'dashboard/addEmployee',
    async (payload: EmployeeDto) => {
        const response = await api.post(config.apis.employees, payload)
        return response.data
    }
)

const deleteEmployee = createAsyncThunk(
    'dashboard/deleteEmployee',
    async (id: string) => {
        console.log('kkkk')

        const response = await api.delete(config.apis.employees + '/' + id)
        console.log('kkkk',response)
        return { id }
    }
)

const getAllEmployees = createAsyncThunk(
    'dashboard/getAllEmployees',
    async () => {
        const response = await api.get(config.apis.employees)
        return response.data
    }
)

export {
    getTotalEmployees,
    getLatestEmployees,
    countByDepartment,
    addDepartment,
    getAllDepartments,
    addEmployee,
    getAllEmployees,
    editDepartment,
    deleteEmployee
}
