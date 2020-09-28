exports.up = function (knex) {
  return knex.schema.createTable("comments", function (table) {
    table.increments("id").primary();
    table.string("user_email", 255).notNullable();
    table.text("content").notNullable();
    table
      .integer("book_id")
      .references("id")
      .inTable("books")
      .notNull()
      .onDelete("cascade");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};
