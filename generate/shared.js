const types = [
  "string",
  "integer",
  "number",
  "object",
  "array",
  "boolean",
  "null",
];

const resourcePrompt = {
  type: "input",
  name: "resourceName",
  message: "https://hostname/{{resourceName}} (typically plural)",
};

const singularResourcePrompt = {
  type: "input",
  name: "singularResourceName",
  message: "https://hostname/{{resourceName}} (singular form)",
};

module.exports = {
  resourcePrompt,
  singularResourcePrompt,
  types,
};
