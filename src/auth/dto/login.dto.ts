import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'usuario@email.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'senha123' })
    @IsString()
    password: string;
}
