import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsEmail,
  IsDate,
  IsNumber,
  IsNotEmpty,
} from "class-validator";

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  FirstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  LastName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  Email: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  DepartmentId: number;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  HireDate: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  Salary: number;
}
