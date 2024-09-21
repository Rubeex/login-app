import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtModules } from './jwt/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:(confi : ConfigService)=>({
        type:'mysql',
        host: confi.get('MYSQL_HOST'),
        port: confi.get('MYSQL_PORT'),
        username: confi.get('MYSQL_USERNAME'),
        password: confi.get('MYSQL_PASSWORD'),
        database: confi.get('MYSQL_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject:[ConfigService]
    }),
    UserModule,
    AuthModule,
    JwtModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
