import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    UseGuards,
    Request,
    Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from 'src/common/decorators/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'Endpoint para criação de usuário no sistema' })
    @ApiBody({
        type: CreateUserDto, examples: {
            default: {
                summary: 'Exemplo de cadastro',
                value: {
                    name: 'Pedro Henrique Melo',
                    email: 'pedromelo.dev.contato@gmail.com',
                    phone: '(85) 98797-5387',
                    bio: 'Gosto de gatinhos',
                    password: '123456',
                    role: 'usuario',
                }
            }
        }
    }
    )
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get()
    @ApiOperation({ summary: 'Endpoint para listar todos os usuários' })
    findAll() {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get(':id')
    @ApiOperation({ summary: 'Listar detalhes do usuário com base no seu uuid' })
    findOne(@Param('id') id: string) {
        return this.usersService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put(':id')
    @ApiOperation({ summary: 'Atualizar dados do usuário com base no seu uuid' })
    @ApiBody({
        type: UpdateUserDto, examples: {
            default: {
                summary: 'Exemplo de atualização de projetos',
                value: {
                    name: 'Pedro Henrique Melo',
                    email: 'pedromelo.dev.contato@gmail.com',
                    phone: '(85) 98797-5387',
                    bio: 'Gosto de gatinhos',
                    password: '123456',
                    role: 'usuario',
                }
            }
        }
    })
    update(@Param('id') id: string, @Body() dto: Partial<CreateUserDto>) {
        return this.usersService.update(id, dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.USER)
    @ApiBearerAuth()
    @Delete(':id')
    @ApiOperation({ summary: 'Deletar usuário com base no seu uuid' })
    remove(@Param('id') id: string, @Request() req) {
        return this.usersService.remove(id, req.user);
    }

    @Patch(':id/password')
    @ApiOperation({ summary: 'Mudar senha para usuário autenticado' })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiBody({ type: UpdatePasswordDto })
    async updatePassword(@Param('id') id: string, @Body() body: UpdatePasswordDto) {
        return this.usersService.updatePassword(id, body.password);
    }
}
