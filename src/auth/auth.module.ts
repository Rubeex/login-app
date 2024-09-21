import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModules } from 'src/jwt/jwt.module';

@Module({
  imports: [UserModule, JwtModules],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
