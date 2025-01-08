import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
export declare class EmployeesService {
    private employeesRepository;
    constructor(employeesRepository: Repository<Employee>);
    create(createEmployeeDto: CreateEmployeeDto): Promise<Employee>;
    findAll(): Promise<Employee[]>;
    findOne(id: number): Promise<Employee>;
    update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee>;
    remove(id: number): Promise<void>;
}
