/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = (knex) =>
  knex.schema.createTable("posts", (table) => {
    table.increments();
    table.integer("userId").notNullable();
    table.foreign("userId").references("id").inTable("users");
    table.text("text").notNullable();
    table.timestamps(true, true);
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("posts");
