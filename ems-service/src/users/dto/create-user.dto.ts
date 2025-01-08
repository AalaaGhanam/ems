import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { UserRole } from '../../shared/enums/user-role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  Username: string;

  @IsString()
  @IsNotEmpty()
  Password: string;

  @IsEnum(UserRole)
  Role: UserRole;
}