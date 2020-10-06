const { generators, partials } = require("./generate");

module.exports = function (plop) {
  // load partials
  Object.entries(partials).map(([name, string]) =>
    plop.setPartial(name, string)
  );

  // load generators
  Object.entries(generators).map(([name, generator]) =>
    plop.setGenerator(name, generator)
  );
};
