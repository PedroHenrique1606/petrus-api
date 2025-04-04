import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePasswordResetTable1743789754184 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'passwords_resets',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        isUnique: true,
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
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
