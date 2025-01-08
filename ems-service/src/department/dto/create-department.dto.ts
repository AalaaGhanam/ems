import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  Name: string;
}
