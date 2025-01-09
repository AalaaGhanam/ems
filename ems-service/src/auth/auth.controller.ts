import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { ApiBody, ApiOkResponse, ApiOperation } from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: "Allows the user to login and obtain an access token using JWT.",
  })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: "Login Response",
    schema: {
      title: "LoginResponse",
      properties: {
        access_token: { type: "string" },
      },
    },
  })
  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const response = await this.authService.login(loginDto);
    return response;
  }
}
