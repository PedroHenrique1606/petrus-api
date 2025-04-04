import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>,
    private readonly mailService: MailService,
  ) { }

  async create(dto: CreateUserDto) {
    const existing = await this.repo.findOne({
      where: { email: dto.email }
    })

    if (existing) {
      throw new Error('Email já cadastrado')
    }
    
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.repo.create({ ...dto, password: hashed });
    const savedUser = await this.repo.save(user);
    // Enviar e-mail de boas-vindas
    await this.mailService.sendWelcomeEmail(savedUser.email, savedUser.name);

    return { message: 'Usuário criado com sucesso!' };
  }

  async findAll() {
    return this.repo.find({ select: ['id', 'name', 'email', 'role', 'createdAt'] });
  }

  async findById(id: string) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async update(id: string, dto: Partial<CreateUserDto>) {
    const user = await this.findById(id);
    if (dto.password) dto.password = await bcrypt.hash(dto.password, 10);
    Object.assign(user, dto);
    return this.repo.save(user);
  }

  async remove(id: string, requestingUser: any) {
    const user = await this.findById(id);
    if (requestingUser.role !== 'usuario' || requestingUser.userId !== id) {
      throw new ForbiddenException('Somente usuários podem se deletar');
    }
    return this.repo.remove(user);
  }
}
