const factory = require("./factory");
const migration = require("./migration");
const routes = require("./routes");
const schema = require("./schema");

// names here become cli names for `npm run generate {{name}}`
module.exports = {
  factory,
  migration,
  routes,
  schema,
};
