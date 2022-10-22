import { pgConnection } from "../config/db.js";
import { Sequelize } from "sequelize";

const SequelizeInstance = new Sequelize(
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

export default SequelizeInstance;