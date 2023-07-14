const Ajv = require("ajv");
const schema = require("./schema.json");

const ajv = new Ajv({ removeAdditional: true });
const validate = ajv.compile({
  $async: true, // make validate fn "thenable"
  additionalProperties: false,
  ...schema,
});

module.exports = validate;
