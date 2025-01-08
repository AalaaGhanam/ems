import { Department } from 'src/department/entities/department.entity';
export declare class Employee {
    Id: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Department: Department;
    HireDate: Date;
    Salary: number;
}
