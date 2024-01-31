const { config } = require('dotenv');

config();

module.exports = {
  PORT: process.env.PORT,
  SERVER_URL: process.env.SERVER_URL,
  CLIENT_URL: process.env.CLIENT_URL,
  SECRET: process.env.SECRET,

  POSTGRESQL_USER: process.env.POSTGRESQL_USER,
  POSTGRESQL_HOST: process.env.POSTGRESQL_HOST,
  POSTGRESQL_DATABASE: process.env.POSTGRESQL_DATABASE,
  POSTGRESQL_PASSWORD: process.env.POSTGRESQL_PASSWORD,
  POSTGRESQL_PORT: process.env.POSTGRESQL_PORT,
};
