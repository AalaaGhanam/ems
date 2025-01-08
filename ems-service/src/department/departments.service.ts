import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const department = this.departmentsRepository.create(createDepartmentDto);
    return this.departmentsRepository.save(department);
  }

  async findAll(): Promise<Department[]> {
    return this.departmentsRepository.find();
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentsRepository.findOne({ where: { Id: id } });
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return department;
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto): Promise<Department> {
    const department = await this.findOne(id);
    Object.assign(department, updateDepartmentDto);
    return this.departmentsRepository.save(department);
  }

  async remove(id: number): Promise<void> {
    const department = await this.findOne(id);
    await this.departmentsRepository.remove(department);
  }

  async getEmployeeCountByDepartment(): Promise<{ department_name: string; employee_count: number }[]> {
    return this.departmentsRepository
    .createQueryBuilder('d')
    .select('d.Name', 'department_name')
    .addSelect('COUNT(e.Id)', 'employee_count')
    .leftJoin('d.employees', 'e') // Ensure this matches the relation name in the Department entity
    .groupBy('d.Name')
    .getRawMany();
  }
}