import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body('username') username: string, @Body('password') password: string) {
    return this.userService.register(username, password);
  }

  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string) {
    return this.userService.login(username, password);
  }
}
