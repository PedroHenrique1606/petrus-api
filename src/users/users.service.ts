import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { MailService } from 'src/mail/mail.service';
import { error } from 'console';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>,
    private readonly mailService: MailService,
  ) { }

  async create(dto: CreateUserDto) {
    const existing = await this.repo.findOne({ where: { email: dto.email } });

    if (existing) {
      throw new BadRequestException('E-mail já cadastrado');
    }

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.repo.create({ ...dto, password: hashed });
    const savedUser = await this.repo.save(user);

    await this.mailService.sendWelcomeEmail(savedUser.email, savedUser.name);

    return { message: 'Usuário criado com sucesso!' };
  }

  async findAllPaginated(page = 1, limit = 10, q?: string) {
    const skip = (page - 1) * limit;

    const query = this.repo
      .createQueryBuilder('user')
      .select(['user.id', 'user.name', 'user.bio', 'user.email', 'user.role', 'user.createdAt'])
      .orderBy('user.createdAt', 'DESC')
      .skip(skip)
      .take(limit);

    if (q) {
      query.where('LOWER(user.name) LIKE LOWER(:q)', { q: `%${q}%` })
        .orWhere('LOWER(user.email) LIKE LOWER(:q)', { q: `%${q}%` });
    }

    const [users, total] = await query.getManyAndCount();

    return {
      data: users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    const { password, ...safeUser } = user;
    return safeUser;
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }
  async update(id: string, dto: Partial<CreateUserDto>) {
    const user = await this.findById(id);
    if (dto.password) dto.password = await bcrypt.hash(dto.password, 10);
    Object.assign(user, dto);
    const updated = await this.repo.save(user);

    const { password, ...safe } = updated;
    return safe;
  }
  async remove(id: string, requestingUser: any) {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    if (requestingUser.role !== 'usuario') {
      throw new ForbiddenException('Somente usuários podem deletar perfis');
    }

    if (requestingUser.userId === id) {
      throw new ForbiddenException('Você não pode deletar a si mesmo');
    }

    await this.repo.remove(user);

    return { message: 'Usuário deletado com sucesso!' };
  }
  
  async updatePassword(id: string, newPassword: string) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    user.password = await bcrypt.hash(newPassword, 10)
    await this.repo.save(user)

    return { message: 'Senha atualizada com sucesso!' };
  }

  async updatePasswordByEmail(email: string, newHashedPassword: string) {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) throw new BadRequestException('Usuário não encontrado');

    user.password = newHashedPassword;
    await this.repo.save(user);
  }
}
