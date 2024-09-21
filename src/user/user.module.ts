import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModules } from 'src/jwt/jwt.module';

@Module({
  imports: [
   TypeOrmModule.forFeature([User]), JwtModules
  ] ,
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
