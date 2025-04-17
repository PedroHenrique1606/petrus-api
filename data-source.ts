// data-source.ts
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from 'src/users/user.entity';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DB_HOST || 'postgresql://petrus_owner:npg_RtFcrnfu43PD@ep-patient-sound-a5392m2g-pooler.us-east-2.aws.neon.tech/petrus?sslmode=require',
    entities: [User],
    migrations: ['src/migrations/*.ts'],
    // Remova o `ssl` separado aqui!
});
