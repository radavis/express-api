const { migrationGenerator, routesGenerator, partials } = require("./generate");

module.exports = function (plop) {
  // load partials
  Object.entries(partials).map(([name, string]) =>
    plop.setPartial(name, string)
  );

  // load generators
  plop.setGenerator("migration", migrationGenerator);
  plop.setGenerator("routes", routesGenerator);
};
