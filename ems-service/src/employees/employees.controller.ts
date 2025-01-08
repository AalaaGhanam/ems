import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  async findAll() {
    return this.employeesService.findAll();
  }

  @Get('employee/:id')
  async findOne(@Param('id') id: string) {
    return this.employeesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }

  @Get('total')
  async getCount(){
    return this.employeesService.getTotalEmployees();
  }

  @Get('count-by-department')
  async getEmployeeCountByDepartment(): Promise<{ department_name: string; employee_count: number }[]> {
    return this.employeesService.getEmployeeCountByDepartment();
  }

  @Get('latest')
  async getLatestEmployee(): Promise<Employee> {
    return this.employeesService.getLatestEmployee();
  }
}