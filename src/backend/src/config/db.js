export const pgConnection = {
  HOST: process.env.POSTGRES_HOST,
  USER: process.env.POSTGRES_USER,
  PASSWORD: process.env.POSTGRES_PASSWORD,
  DB: process.env.POSTGRES_DB,
  dialect: "postgres",
  pool: {
    max: 5, // maximum amount of connections
    min: 0, // minimum amount of connections
    acquire: 30000, // maximum time for connection waiting
    idle: 10000, // maximum amount of time before the connection can be released
  },
};
