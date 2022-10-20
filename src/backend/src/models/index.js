import { pgConnection } from "../config/db.config.js";
import { Sequelize } from "sequelize";
import Tutorial from "./tutorial.model.js"

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

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = Tutorial(sequelize, Sequelize);

export default db;
