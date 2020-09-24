exports.up = function(knex) {
  // http://knexjs.org/#Schema
  return knex.schema
    .createTable('books', function(table) {
      // http://knexjs.org/#Schema-Building
      table.increments('id').primary();
      table.string('title', 255).notNullable();
      table.string('author', 255).notNullable();
      table.integer('year').unsigned();
      table.boolean('paperback').notNullable().defaultTo(false);
      table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('books')
};
