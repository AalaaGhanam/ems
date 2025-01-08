import { IsString, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../../shared/enums/user-role.enum';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  Username?: string;

  @IsString()
  @IsOptional()
  Password?: string;

  @IsEnum(UserRole)
  @IsOptional()
  Role?: UserRole;
}