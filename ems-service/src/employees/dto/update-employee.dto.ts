import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsDate, IsOptional, IsNumber } from "class-validator";
import { Department } from "src/department/entities/department.entity";

export class UpdateEmployeeDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  FirstName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  LastName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  Email: string;

  @IsDate()
  @ApiProperty()
  HireDate?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  DepartmentId: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  Salary?: Number;
}
