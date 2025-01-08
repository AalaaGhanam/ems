import { IsString, IsDate, IsOptional, IsNumber } from 'class-validator';
import { Department } from 'src/department/entities/department.entity';

export class UpdateEmployeeDto {
  @IsString()
  @IsOptional()
  FirstName?: string;

  @IsString()
  @IsOptional()
  LastName?: string;

  @IsString()
  @IsOptional()
  Email: string;

  @IsDate()
  HireDate?: string;

  @IsNumber()
  @IsOptional()
  DepartmentId: number;

  @IsNumber()
  @IsOptional()
  Salary?: Number;
}