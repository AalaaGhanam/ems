import { UserRole } from '../enums/userRole';

export interface User {
	name: string;
	role: UserRole;
}
