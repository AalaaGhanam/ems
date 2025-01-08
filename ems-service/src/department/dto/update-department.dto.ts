import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class UpdateDepartmentDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  Name?: string;
}
