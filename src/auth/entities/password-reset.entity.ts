import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('passwords_resets')
export class PasswordReset {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    code: string;

    @Column({ default: false })
    isValid: boolean;

    @CreateDateColumn()
    createdAt: Date;
}
