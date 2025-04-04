import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PasswordReset } from "./entities/password-reset.entity";
import { Repository } from "typeorm";
import { UsersService } from "src/users/users.service";
import { MailService } from "src/mail/mail.service";
import * as bcrypt from 'bcrypt'

@Injectable()
export class PasswordResetService {
    constructor(
        @InjectRepository(PasswordReset)
        private resetRepo: Repository<PasswordReset>,
        private usersService: UsersService,
        private mailService: MailService
    ) { }

    generateCode(): string {
        return Math.floor(100000 + Math.random() * 100000).toString()
    }

    async requestReset(email: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) throw new BadRequestException('Usuário não cadastrado');

        const code = this.generateCode();

        const reset = this.resetRepo.create({ email, code });
        await this.resetRepo.save(reset);

        await this.mailService.sendResetPasswordEmail(email, code);

        return { message: 'Código enviado com sucesso para seu e-mail!' };
    }

    async validateCode(email: string, code: string) {
        const record = await this.resetRepo.findOne({
            where: { email, code },
            order: { createdAt: 'DESC' },
        });

        if (!record) throw new BadRequestException('Código inválido ou expirado');

        record.isValid = true;
        await this.resetRepo.save(record);

        return { message: 'Código validado com sucesso. Agora você pode redefinir sua senha.' };
    }

    async resetPassword(email: string, newPassword: string) {
        const record = await this.resetRepo.findOne({
            where: { email, isValid: true },
            order: { createdAt: 'DESC' },
        });

        if (!record) throw new BadRequestException('Você precisa validar o código primeiro');

        const hashed = await bcrypt.hash(newPassword, 10);
        await this.usersService.updatePasswordByEmail(email, hashed);

        await this.resetRepo.delete({ email });

        return { message: 'Senha redefinida com sucesso!' };
    }

}