const { Pool } = require('pg');

const {
  POSTGRESQL_USER,
  POSTGRESQL_HOST,
  POSTGRESQL_DATABASE,
  POSTGRESQL_PASSWORD,
  POSTGRESQL_PORT,
} = require('../constants');

const pool = new Pool({
  user: POSTGRESQL_USER,
  host: POSTGRESQL_HOST,
  database: POSTGRESQL_DATABASE,
  password: POSTGRESQL_PASSWORD,
  port: POSTGRESQL_PORT,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
