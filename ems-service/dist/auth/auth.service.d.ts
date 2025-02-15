import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    validateUser(id: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
