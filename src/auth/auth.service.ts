import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async create(registerDTO: RegisterDTO) {
    const { name, username, email, password, birthdate } = registerDTO;
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    return await this.userService.create({
      name,
      username,
      email,
      password: hash,
      birthdate,
    });
  }

  async login(loginDTO: LoginDTO) {
    const { email, password } = loginDTO;
    try {
      const user = await this.userService.findEmail(email);
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const payload = { id: user.id, rol: user.rol };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'An error occurred during sign-in',
        );
      }
    }
  }

}
