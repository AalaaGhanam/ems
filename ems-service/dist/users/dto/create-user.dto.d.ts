import { UserRole } from '../../shared/enums/user-role.enum';
export declare class CreateUserDto {
    Username: string;
    Password: string;
    Role: UserRole;
}
