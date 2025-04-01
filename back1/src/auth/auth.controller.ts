import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return await this.authService.login(body);
  }

  @Public()
  @Post('signup')
  async signup(@Body() body: any) {
    return await this.authService.signup(body);
  }
}
