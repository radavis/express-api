const config = require("@root/config");
const db = require("knex")(config.knex);

module.exports = db;
