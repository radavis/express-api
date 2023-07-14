require("dotenv").config();

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
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};

module.exports = {
  development: {
    ...defaults,
    connection:
      "postgres://postgres:password@localhost:5433/express-api_development",
  },
  test: {
    ...defaults,
    connection: "postgres://postgres:password@localhost:5434/express-api_test",
  },
  production: {
    ...defaults,
    connection: process.env.DATABASE_URL,
  },
};
