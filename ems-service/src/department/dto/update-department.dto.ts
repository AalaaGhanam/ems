import { IsString, IsOptional } from 'class-validator';

export class UpdateDepartmentDto {
  @IsString()
  @IsOptional()
  Name?: string;
}