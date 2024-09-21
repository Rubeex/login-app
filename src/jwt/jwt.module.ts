import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/roles.guard';

@Module({
    imports:[JwtModule.registerAsync({
        imports:[ConfigModule],
        inject:[ConfigService],
        useFactory: (config:ConfigService)=>({
            global:true,
            secret: config.get('JWT_SECRET'),
            signOptions: {expiresIn: '1h'},
        })
    })],
    exports:[JwtModule, AuthGuard, RolesGuard],
    providers:[AuthGuard,RolesGuard]
})


export class JwtModules {}
