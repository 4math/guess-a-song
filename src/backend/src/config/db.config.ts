import { PgConnection } from "../../types/config/db.config";

const host: string | undefined = process.env.POSTGRES_HOST;
const user: string | undefined = process.env.POSTGRES_USER;
const password: string | undefined = process.env.POSTGRES_PASSWORD;
const db: string | undefined = process.env.POSTGRES_DB;

if (
  host === undefined ||
  user === undefined ||
  password === undefined ||
  db === undefined
) {
  throw new TypeError(
    `Value of host(${host}) or user(${user}) or password(***) or db(${db}) for Postgres connection is undefined`
  );
}

export const pgConnection: PgConnection = {
  HOST: host,
  USER: user,
  PASSWORD: password,
  DB: db,
  dialect: "postgres",
  pool: {
    max: 5, // maximum amount of connections
    min: 0, // minimum amount of connections
    acquire: 30000, // maximum time for connection waiting
    idle: 10000, // maximum amount of time before the connection can be released
  },
};
