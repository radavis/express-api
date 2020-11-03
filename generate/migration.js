const { timestamp } = require("./util");

// map input column type to partial name
// https://handlebarsjs.com/guide/partials.html#dynamic-partials
const addColumnFn = {
  boolean: "addBooleanColumn",
  integer: "addIntegerColumn",
  string: "addStringColumn",
  text: "addTextColumn",
  foreign: "foreignKey",
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
      addColumnFn: () => addColumnFn[columnType || "string"],
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
      name: "tableName",
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
      path: `./db/migrations/${timestamp()}_{{tableName}}.js`,
      templateFile: "./db/migrations/migration.js.hbs",
    },
  ],
};

module.exports = migrationGenerator;
