import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePasswordResetTable1743789754184 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'passwords_resets',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isUnique: true,
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                    },
                    {
                        name: 'code',
                        type: 'varchar',
                    },
                    {
                        name: 'isValid',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('passwords_resets');
    }
}
