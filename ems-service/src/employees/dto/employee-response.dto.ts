import { ApiProperty } from "@nestjs/swagger";
import { Department } from "src/department/entities/department.entity";

export class EmployeeResponseDto {
  @ApiProperty()
  FirstName: string;

  @ApiProperty()
  LastName: string;

  @ApiProperty()
  Email: string;

  @ApiProperty()
  DepartmentId: number;

  @ApiProperty()
  Department: Department;

  @ApiProperty()
  HireDate: Date;

  @ApiProperty()
  Salary: number;

  @ApiProperty()
  Id: number;
}
