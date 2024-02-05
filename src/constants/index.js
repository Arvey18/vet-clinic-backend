import { config } from 'dotenv';

config();

export const {
  ENVIRONMENT,
  PORT,

  SERVER_URL,
  CLIENT_URL,
  SECRET,

  POSTGRESQL_USER,
  POSTGRESQL_HOST,
  POSTGRESQL_DATABASE,
  POSTGRESQL_PASSWORD,
  POSTGRESQL_PORT,

  TOKEN_EXPIRATION,
} = process.env;
