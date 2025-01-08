import { ApiProperty } from "@nestjs/swagger";

export class DepartmentResponseDto {
  @ApiProperty()
  Name: string;

  @ApiProperty()
  Id: string;
}
