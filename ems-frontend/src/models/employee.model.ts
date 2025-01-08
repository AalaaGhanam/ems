import { Department } from './department.model'

export interface Employee {
    FirstName: string
    LastName: string
    Email: string
    DepartmentId: number
    HireDate: Date
    Salary: string
    Id: string
    Department: Department
}
