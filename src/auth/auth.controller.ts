import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'Login do usuário' })
    @ApiBody({ type: LoginDto })
    async login(@Body() body: LoginDto) {
        return this.authService.loginWithCredentials(body.email, body.password);
    }
}
