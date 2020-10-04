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

module.exports = partials;
