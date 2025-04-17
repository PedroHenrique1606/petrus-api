import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1743723385603 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isUnique: true,
                        default: 'uuid_generate_v4()'
                    },
                    { name: 'name', type: 'varchar' },
                    { name: 'email', type: 'varchar', isUnique: true },
                    { name: 'phone', type: 'varchar', isNullable: true },
                    { name: 'bio', type: 'text', isNullable: true },
                    { name: 'password', type: 'varchar' },
                    { name: 'role', type: 'enum', enum: ['usuario', 'apoiador'], default: `'usuario'` },
                    { name: 'createdAt', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
