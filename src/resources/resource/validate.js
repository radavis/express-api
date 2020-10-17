const Ajv = require("ajv");
const schema = require("./schema.json");

const ajv = new Ajv();
const validate = ajv.compile({
  $async: true, // make validate fn "thenable"
  removeAdditional: true, // throw away extra object properties when validating
  ...schema,
});

module.exports = validate;
