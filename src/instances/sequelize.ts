import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();

const database = process.env.DB_NAME as string;
const DB_USER = process.env.DB_USER as string;
const DB_PASSWORD = process.env.DB_PASSWORD as string;
const DB_HOST = process.env.DB_HOST as string || "db";
const DB_PORT = parseInt(process.env.DB_PORT || "5432");

const db = new Sequelize(database, DB_USER, DB_PASSWORD, {
  dialect: "postgres",
  port: DB_PORT,
  host: DB_HOST,
  logging: false
});

export default db;