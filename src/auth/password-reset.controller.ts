import { Controller, Post, Body, Patch } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { ConfirmPasswordResetDto } from './dto/confirm-password-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import {
    ApiTags,
    ApiBody,
    ApiOperation,
    ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Password Reset')
@Controller('auth/password-reset')
export class PasswordResetController {
    constructor(private readonly service: PasswordResetService) { }

    @Post('request')
    @ApiOperation({ summary: 'Solicitar código de redefinição de senha' })
    @ApiBody({
        type: RequestPasswordResetDto,
        examples: {
            exemplo: {
                value: {
                    email: 'usuario@email.com',
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Código enviado com sucesso para o e-mail informado.',
    })
    request(@Body() body: RequestPasswordResetDto) {
        return this.service.requestReset(body.email);
    }

    @Post('validate')
    @ApiOperation({ summary: 'Validar código de redefinição de senha' })
    @ApiBody({
        type: ConfirmPasswordResetDto,
        examples: {
            exemplo: {
                value: {
                    email: 'usuario@email.com',
                    code: '123456',
                },
            },
        },
    })
    @ApiResponse({
        status: 200,
        description:
            'Código validado com sucesso. Agora o usuário pode redefinir a senha.',
    })
    validate(@Body() body: ConfirmPasswordResetDto) {
        return this.service.validateCode(body.email, body.code);
    }

    @Patch()
    @ApiOperation({ summary: 'Redefinir senha após validação do código' })
    @ApiBody({
        type: ResetPasswordDto,
        examples: {
            exemplo: {
                value: {
                    email: 'usuario@email.com',
                    newPassword: 'novaSenha123',
                },
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Senha redefinida com sucesso.',
    })
    reset(@Body() body: ResetPasswordDto) {
        return this.service.resetPassword(body.email, body.newPassword);
    }
}
