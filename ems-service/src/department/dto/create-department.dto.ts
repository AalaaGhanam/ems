import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  Name: string;
}