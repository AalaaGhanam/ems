import { IsString, IsEmail, IsDate, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  FirstName: string;

  @IsString()
  @IsNotEmpty()
  LastName: string;

  @IsEmail()
  @IsNotEmpty()
  Email: string;

  @IsNumber()
  @IsNotEmpty()
  DepartmentId: number;

  @IsDate()
  @IsNotEmpty()
  HireDate: Date;

  @IsNumber()
  @IsNotEmpty()
  Salary: number;
}