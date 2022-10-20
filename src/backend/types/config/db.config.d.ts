import { Dialect } from "sequelize/types/sequelize";

export interface PgConnection {
  readonly HOST: string;
  readonly USER: string;
  readonly PASSWORD: string;
  readonly DB: string;
  readonly dialect: Dialect;
  readonly pool: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
}
