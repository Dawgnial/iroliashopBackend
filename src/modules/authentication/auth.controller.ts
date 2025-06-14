import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterDto): Promise<{ accessToken: string }> {
    return this.authService.register(data);
  }

  @Post('login')
  async login(@Body() data: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(data);
  }
}
