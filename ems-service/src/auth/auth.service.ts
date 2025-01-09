import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { UsersService } from "src/users/users.service";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    if (user && bcrypt.compareSync(pass, user.Password)) {
      const { Password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginUserDto: LoginDto) {
    try {
      const { username, password } = loginUserDto;
      const user = await this.userService.findOneByUsername(username);

      if (!user || !(await bcrypt.compare(password, user?.Password))) {
        throw new BadRequestException("Invalid email or password");
      }
      const payload = {
        username: user.Username,
        userId: user.Id,
        role: user.Role,
      };
      const token = await this.jwtService.sign(payload);
      return {
        access_token: token,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
