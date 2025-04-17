import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private logger = new Logger(MailService.name);

  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.config.get('EMAIL_USER'),
        pass: this.config.get('EMAIL_PASS'),
      },
    });
  }

  async sendWelcomeEmail(to: string, name: string) {
    const subject = 'Bem-vindo ao universo Petrus!';
    const html = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9f9f9; padding: 40px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; padding: 30px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
          <h2 style="color: #1A1A1A; font-size: 28px; margin-bottom: 16px;">Olá, ${name} 👋</h2>
          <p style="color: #444; font-size: 18px; line-height: 1.6;">
            Seja muito bem-vindo ao <strong style="color: #0066cc;">universo Petrus</strong>! 🎉
          </p>
          <p style="color: #555; font-size: 16px; line-height: 1.6; margin-top: 20px;">
            O Petrus é um sistema completo de <strong>gerenciamento de pessoas</strong>, pensado para facilitar sua rotina e aprimorar a forma como você se conecta com sua equipe e seus projetos.
          </p>
          <p style="color: #555; font-size: 16px; line-height: 1.6;">
            Estamos muito felizes em te receber e empolgados para acompanhar sua jornada com a gente.
          </p>
          
          <div style="margin: 40px 0; text-align: center;">
            <a href="http://localhost:5173/login" target="_blank" style="background-color: #0066cc; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 16px;">
              Acessar a plataforma Petrus
            </a>
          </div>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

          <p style="font-size: 12px; color: #999; text-align: center;">
            Este é um e-mail automático enviado pelo sistema Petrus. Por favor, não responda.
          </p>
        </div>
      </div>
  `;

    try {
      await this.transporter.sendMail({
        from: `"Equipe Petrus" <${this.config.get('EMAIL_USER')}>`,
        to,
        subject,
        html,
      });

      this.logger.log(`Email de boas-vindas enviado para: ${to}`);
    } catch (error) {
      this.logger.error(`Erro ao enviar email para ${to}`, error);
    }
  }

  async sendResetPasswordEmail(to: string, code: string) {
    const subject = 'Recuperação de Senha - Código de Verificação';
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 40px; background-color: #f6f6f6;">
        <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #1a1a1a;">Código de recuperação de senha</h2>
          <p style="font-size: 16px; color: #555;">
            Recebemos sua solicitação para redefinir a senha da sua conta.
            Utilize o código abaixo para prosseguir com a alteração:
          </p>
          <div style="font-size: 28px; font-weight: bold; margin: 30px 0; text-align: center; color: #0066cc;">
            ${code}
          </div>
          <p style="font-size: 14px; color: #999;">
            Caso não tenha solicitado a recuperação de senha, ignore este e-mail.
          </p>
        </div>
      </div>
    `;

    try {
      await this.transporter.sendMail({
        from: `"Equipe Petrus" <${this.config.get('EMAIL_USER')}>`,
        to,
        subject,
        html,
      });

      this.logger.log(`Email de recuperação enviado para: ${to}`);
    } catch (error) {
      this.logger.error(`Erro ao enviar email de recuperação para ${to}`, error);
    }
  }
}
