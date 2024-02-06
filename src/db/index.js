import { Sequelize } from 'sequelize';

import {
  ENVIRONMENT,
  POSTGRESQL_USER,
  POSTGRESQL_HOST,
  POSTGRESQL_DATABASE,
  POSTGRESQL_PASSWORD,
  POSTGRESQL_PORT,
} from '../constants/index.js';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: POSTGRESQL_HOST,
  port: POSTGRESQL_PORT,
  username: POSTGRESQL_USER,
  password: POSTGRESQL_PASSWORD,
  database: POSTGRESQL_DATABASE,
  dialectOptions: {
    ssl: ENVIRONMENT === 'PRODUCTION', // Enable SSL based on environment
  },
});

export default sequelize;
