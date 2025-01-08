import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
} from "@nestjs/common";
import { EmployeesService } from "./employees.service";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { Employee } from "./entities/employee.entity";
import { ApiBody, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { EmployeeResponseDto } from "./dto/employee-response.dto";

@Controller("employees")
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @ApiOperation({
    summary: "This endpoint create employee.",
  })
  @ApiOkResponse({
    type: EmployeeResponseDto,
  })
  @ApiBody({ type: CreateEmployeeDto })
  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @ApiOperation({
    summary: "This endpoint get all employees.",
  })
  @ApiOkResponse({
    type: EmployeeResponseDto,
  })
  @Get()
  async findAll() {
    return this.employeesService.findAll();
  }

  @ApiOperation({
    summary: "This endpoint update employee.",
  })
  @ApiOkResponse({
    type: EmployeeResponseDto,
  })
  @Get("employee/:id")
  async findOne(@Param("id") id: string) {
    return this.employeesService.findOne(id);
  }

  @ApiOperation({
    summary: "This endpoint get employee.",
  })
  @ApiOkResponse({
    type: EmployeeResponseDto,
  })
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @ApiOperation({
    summary: "This endpoint delete employee.",
  })
  @ApiOkResponse({
    description: "Employees Response",
    schema: {
      title: "EmployeesResponse",
      properties: {
        message: { type: "Employees deleted successfully!" },
      },
    },
  })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.employeesService.remove(id);
  }

  @ApiOperation({
    summary: "This endpoint retrives total number of all employees.",
  })
  @ApiOkResponse({
    description: "Total Employees Response",
    schema: {
      title: "Total EmployeesResponse",
      properties: {
        message: { type: "100" },
      },
    },
  })
  @Get("total")
  async getCount() {
    return this.employeesService.getTotalEmployees();
  }

  @ApiOperation({
    summary:
      "This endpoint retrives total number of all employees per department.",
  })
  @ApiOkResponse({
    description: "Employees Count Response",
    schema: {
      title: "EmployeesCountResponse",
      properties: {
        message: { type: "{ department_name: 'HR'; employee_count: 90 }" },
      },
    },
  })
  @Get("count-by-department")
  async getEmployeeCountByDepartment(): Promise<
    { department_name: string; employee_count: number }[]
  > {
    return this.employeesService.getEmployeeCountByDepartment();
  }

  @ApiOperation({
    summary: "This endpoint retrive recent hires employees .",
  })
  @ApiOkResponse({
    type: EmployeeResponseDto,
  })
  @Get("latest")
  async getLatestEmployee(): Promise<Employee> {
    return this.employeesService.getLatestEmployee();
  }
}
