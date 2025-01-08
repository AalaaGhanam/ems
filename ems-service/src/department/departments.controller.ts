import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { DepartmentsService } from "./departments.service";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { UpdateDepartmentDto } from "./dto/update-department.dto";
import { ApiBody, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { DepartmentResponseDto } from "./dto/department-response.dto";

@Controller("departments")
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @ApiOperation({
    summary: "This endpoint add new department.",
  })
  @ApiOkResponse({
    description: "Department Response",
    schema: {
      title: "DepartmentResponse",
      properties: {
        message: { type: "Department added successfully!" },
      },
    },
  })
  @ApiBody({ type: CreateDepartmentDto })
  @Post()
  async create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @ApiOperation({
    summary: "This endpoint retrives all departments.",
  })
  @ApiOkResponse({
    type: DepartmentResponseDto,
  })
  @Get()
  async findAll() {
    return this.departmentsService.findAll();
  }

  @ApiOperation({
    summary: "This endpoint retrives department.",
  })
  @ApiOkResponse({
    type: DepartmentResponseDto,
  })
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.departmentsService.findOne(+id);
  }

  @ApiOperation({
    summary: "This endpoint update department.",
  })
  @ApiOkResponse({
    type: DepartmentResponseDto,
  })
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentsService.update(+id, updateDepartmentDto);
  }

  @ApiOperation({
    summary: "This endpoint delete department.",
  })
  @ApiOkResponse({
    description: "Department Response",
    schema: {
      title: "DepartmentResponse",
      properties: {
        message: { type: "Department deleted successfully!" },
      },
    },
  })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.departmentsService.remove(+id);
  }
}
