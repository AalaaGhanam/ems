import { ApiProperty } from "@nestjs/swagger";
import { Department } from "src/department/entities/department.entity";
import { UserRole } from "src/shared/enums/user-role.enum";

export class UserResponseDto {
  @ApiProperty()
  Username: string;

  @ApiProperty()
  Password: string;

  @ApiProperty()
  Role: UserRole;
}
