const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'vet_clinic',
  password: 'killermode',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
