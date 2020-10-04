/**
 * usage:
 *
 * $ npm run generate -- routes -- \
 *     --resourceName albums
 *
 * $ npm run generate routes albums album
 *
 */
const routesGenerator = {
  description: "generate express CRUD routes for a resource",
  prompts: [
    {
      type: "input",
      name: "resourceName",
      message: "https://hostname/{{resourceName}} (typically plural)",
    },
    {
      type: "input",
      name: "singularResourceName",
      message: "singular form",
    },
  ],
  actions: [
    {
      type: "add",
      path: `./src/resources/{{resourceName}}/index.js`,
      templateFile: "./src/resources/resource/index.js.hbs",
    },
    {
      type: "add",
      path: `./src/resources/{{resourceName}}/resource.test.js`,
      templateFile: "./src/resources/resource/resource.test.js.hbs",
    },
  ],
};

module.exports = routesGenerator;
