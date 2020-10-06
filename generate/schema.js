const { resourcePrompt, singularResourcePrompt, types } = require("./shared");

/**
 * @function filterPropertiesInput
 * @param {string} input user input from prompt
 * @returns {object[]} array of objects: { propertyName, propertyType }
 */
const filterPropertiesInput = (input) =>
  input
    .split(/\s+/)
    .map((entry) => entry.split(":"))
    .map(([propertyName, propertyType]) => ({
      propertyName,
      propertyType: propertyType || "string",
    }));

const propertiesPrompt = {
  type: "input",
  name: "properties",
  message: `propertyName nextPropertyName:{${types.join(",")}} ...`,
  filter: filterPropertiesInput,
};

/**
 * usage:
 * $ npm run generate schema albums album "artist title notes year:integer"
 */
const schemaGenerator = {
  description: "generate a json-schema for validation of resources",
  prompts: [resourcePrompt, singularResourcePrompt, propertiesPrompt],
  actions: [
    {
      type: "add",
      path: `./src/resources/{{resourceName}}/schema.json`,
      templateFile: "./src/resources/resource/schema.json.hbs",
    },
    {
      type: "add",
      path: `./src/resources/{{resourceName}}/validate.js`,
      templateFile: "./src/resources/resource/validate.js",
    },
  ],
};

module.exports = schemaGenerator;
