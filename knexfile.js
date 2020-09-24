const defaults = {
  client: 'pg',
  migrations: { // http://knexjs.org/#Migrations-API
    directory: './src/db/migrations',
    extension: 'js',
    tableName: 'knex_migrations'
  },
  pool: {
    min: 2,
    max: 10
  },
  seeds: { // http://knexjs.org/#Seeds-API
    directory: './src/db/seeds',
    loadExtensions: ['.js']
  }
}

module.exports = {
  development: {
    ...defaults,
    connection: process.env.DATABASE_URL || 'postgres://localhost:5432/express-api_development'
  },
  test: {
    ...defaults,
    connection: 'postgres://localhost:5432/express-api_test'
  },
  production: {
    ...defaults,
    connection: process.env.DATABASE_URL
  }
};
