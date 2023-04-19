import { Controller, Get, Post, Body, Headers  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('whoami')
  whoami(@Headers('authorization') token: string) {
    return this.authService.whoami(token);
  }

  @Get('send-email')
  async sendExampleEmail(): Promise<void> {
    await this.authService.sendMail('luchoherrerafernandez@gmail.com', 'Ejemplo de correo electrónico', '<p>Hola!</p>');
  }
}
