import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { SignupDto } from "./dto/signup.dto";
import { User } from "./models/users.model";
import { AuthGuard } from "@nestjs/passport";

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  public async signup(@Body() signupDto: SignupDto): Promise<User> {
    return this.userService.signup(signupDto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  public async signin(
    @Body() signinDto: SignupDto,
  ): Promise<{ name: string; jwtToken: string; email: string }> {
    return this.userService.signin(signinDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
