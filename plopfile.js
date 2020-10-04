/**
 * @function timestamp
 * @returns {string} timestamp string in 'YYYYMMDDHHMMSS' format
 */
const timestamp = () =>
  new Date()
    .toISOString()
    .replace(/[TZ-]/g, "")
    .replace(/:/g, "")
    .split(".")[0];

// map input column types to partial names
const addColumnFn = {
  boolean: () => "addBooleanColumn",
  integer: () => "addIntegerColumn",
  string: () => "addStringColumn",
  text: () => "addTextColumn",
  foreign: () => "foreignKey",
};

const partials = {
  addBooleanColumn:
    'table.boolean("{{columnName}}").notNullable().defaultTo(false);\n',
  addIntegerColumn: 'table.integer("{{columnName}}").unsigned();\n',
  addStringColumn: 'table.string("{{columnName}}", 255).notNullable();\n',
  addTextColumn: 'table.text("{{columnName}}");\n',
  foreignKey:
    'table.integer("{{columnName}}").references("id").inTable("other_table").notNullable().onDelete("cascade");\n',
  primaryKey: 'table.increments("id").primary();\n',
};

/**
 * @function filterColumnsInput
 * @param {string} input user input from prompt: "column_name next_column_name:{string,integer,boolean,text} ..."
 * @returns {object[]} array of objects: { columnName, columnType, addColumnFn }
 */
const filterColumnsInput = (input) =>
  input
    .split(/\s+/)
    .map((entry) => entry.split(":"))
    .map(([columnName, columnType]) => ({
      columnName,
      columnType,
      addColumnFn: addColumnFn[columnType || "string"],
    }));

/**
 * usage:
 *
 * $ npm run generate -- migration -- \
 *     --table albums \
 *     --columns "artist title notes:text year:integer owner_id:foreign"
 *
 * $ npm run generate migration albums "artist title notes:text year:integer owner_id:foreign"
 * $ npm run generate migration comments "user_email content:text book_id:integer"
 *
 */
const migrationGenerator = {
  description: "generate a knex database migration to create a table",
  prompts: [
    {
      type: "input",
      name: "table",
      message: "table_name (plural, snake_case)",
    },
    {
      type: "input",
      name: "columns",
      message: "column_name next_column_name:{string,integer,boolean,text} ...",
      filter: filterColumnsInput,
    },
  ],
  actions: [
    {
      type: "add",
      path: `./src/db/migrations/${timestamp()}_{{table}}.js`,
      templateFile: "./src/db/migrations/migration.js.hbs",
    },
  ],
};

module.exports = function (plop) {
  // load partials
  Object.entries(partials).map(([name, string]) =>
    plop.setPartial(name, string)
  );

  // load generators
  plop.setGenerator("migration", migrationGenerator);
};
