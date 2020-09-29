// load variables from .env
require("dotenv").config();
// enable '@root', '@src' strings when requiring modules
require("module-alias/register");

const { description, name, version } = require("@root/package.json");
const { NODE_ENV, PORT } = process.env;

// exit if we do not recognize the NODE_ENV setting
const environments = Object.freeze(["development", "production", "test"]);
if (!environments.includes(NODE_ENV)) {
  console.error(`NODE_ENV is set to non-standard value: '${NODE_ENV}'`);
  console.error(`accepted values are: ${environments}`);
  console.error(`❌ terminating app...`);
  process.exit(1);
}

// the singular object from which the application is configured
const config = {
  description,
  knex: require("@root/knexfile")[NODE_ENV],
  name,
  environment: NODE_ENV,
  port: PORT || 8000,
  version,
};

module.exports = config;
