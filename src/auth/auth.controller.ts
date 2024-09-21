import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { Auth } from './decorator/auth.decorator';
import { Roles } from 'src/Common/interfaces/Roles';
import { ActiveUser } from 'src/Common/decorator/active-user.decorator';
import { ActiveUserInterface } from 'src/Common/interfaces/ActiveUserInterface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/register")
  async register(@Body() registerDTO: RegisterDTO) {
    return await this.authService.create(registerDTO);
  }
  
  @Post("/login")
  async login(@Body() loginDTO: LoginDTO) {
    return await this.authService.login(loginDTO);
  }

}
