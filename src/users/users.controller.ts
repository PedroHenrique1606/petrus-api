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
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from 'src/common/decorators/role.enum';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
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
    findAll() {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: Partial<CreateUserDto>) {
        return this.usersService.update(id, dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.USER)
    @ApiBearerAuth()
    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
        return this.usersService.remove(id, req.user);
    }
}
