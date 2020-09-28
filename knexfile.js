const defaults = {
  client: "pg",
  log: {
    warn(message) {
      // https://github.com/knex/knex/issues/3921
      if (message.match(/^FS-related option specified/)) return;
      console.log(message);
    },
  },
  migrations: {
    directory: "./src/db/migrations",
  },
  seeds: {
    directory: "./src/db/seeds",
  },
};

module.exports = {
  development: {
    ...defaults,
    connection:
      process.env.DATABASE_URL ||
      "postgres://localhost:5432/express-api_development",
  },
  test: {
    ...defaults,
    connection: "postgres://localhost:5432/express-api_test",
  },
  production: {
    ...defaults,
    connection: process.env.DATABASE_URL,
  },
};
