import { pgConnection } from "../config/db.config";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  pgConnection.DB,
  pgConnection.USER,
  pgConnection.PASSWORD,
  {
    host: pgConnection.HOST,
    dialect: pgConnection.dialect,
    pool: {
      max: pgConnection.pool.max,
      min: pgConnection.pool.min,
      acquire: pgConnection.pool.acquire,
      idle: pgConnection.pool.idle,
    },
  }
);
