import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Employee } from "./entities/employee.entity";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { DepartmentsService } from "src/department/departments.service";
import { Department } from "src/department/entities/department.entity";

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
    private departmentsService: DepartmentsService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const department = await this.departmentsService.findOne(
      createEmployeeDto.DepartmentId,
    );
    const employee = this.employeesRepository.create({
      ...createEmployeeDto,
      Department: department,
    });
    return await this.employeesRepository.save(employee);
  }

  async findAll(): Promise<Employee[]> {
    return this.employeesRepository.find({ relations: ["Department"] });
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeesRepository.findOne({
      where: { Id: id },
      relations: ["Department"],
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const employee = await this.findOne(id);
    if (updateEmployeeDto.DepartmentId) {
      const department = await this.departmentsService.findOne(
        updateEmployeeDto.DepartmentId,
      );
      employee.Department = department;
    }
    Object.assign(employee, updateEmployeeDto);
    return this.employeesRepository.save(employee);
  }

  async remove(id: string): Promise<void> {
    const employee = await this.findOne(id);
    await this.employeesRepository.remove(employee);
  }

  async getTotalEmployees(): Promise<number> {
    const result = await this.employeesRepository
      .createQueryBuilder("e")
      .select("COUNT(e.Id)", "count")
      .getRawOne();
    if (!result || isNaN(result.count)) {
      throw new Error("Invalid count result");
    }
    return parseInt(result.count, 10);
  }

  async getLatestEmployee(): Promise<Employee> {
    return this.employeesRepository
      .createQueryBuilder("e")
      .select(["e.FirstName", "e.LastName", "e.HireDate"])
      .orderBy("e.HireDate", "ASC")
      .limit(1)
      .getOne();
  }

  async getEmployeeCountByDepartment(): Promise<
    { department_name: string; employee_count: number }[]
  > {
    return this.departmentsService.getEmployeeCountByDepartment();
  }
}
