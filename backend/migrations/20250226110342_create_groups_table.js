exports.up = function(knex) {
  return knex.schema.createTable("groups", function(table) {
    table.increments("id").primary();  // Auto-incrementing ID
    table.string("name").notNullable();  // Group name
    table.text("description");  // Optional group description
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Auto timestamp
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("groups");
};
