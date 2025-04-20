// @ts-nocheck
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../entities/User';
import { Unit } from '../entities/Unit';
import { Owner } from '../entities/Owner';
import { Tenant } from '../entities/Tenant';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',
  entities: [
    User,
    Unit,
    Owner,
    Tenant
  ],
  migrations: [],
  subscribers: [],
});

// Initialize the data source
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err: Error) => {
    console.error('Error during Data Source initialization', err);
  });