import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetController } from './password-reset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordReset } from './entities/password-reset.entity';
import { MailModule } from 'src/mail/mail.module';

@Module({
    imports: [
        UsersModule,
        MailModule,
        PassportModule,
        TypeOrmModule.forFeature([PasswordReset]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN') },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService, JwtStrategy, PasswordResetService],
    controllers: [AuthController, PasswordResetController],
})
export class AuthModule { }
