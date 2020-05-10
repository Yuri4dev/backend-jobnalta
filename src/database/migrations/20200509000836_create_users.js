exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.string("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.decimal("whatsapp").notNullable();
    table.decimal("city").notNullable();
    table.decimal("uf", 2).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
