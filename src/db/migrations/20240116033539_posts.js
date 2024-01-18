/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = (knex) =>
  knex.schema.createTable("posts", (table) => {
    table.increments();
    table.integer("user_id").notNullable();
    table.foreign("user_id").references("id").inTable("users");

    table.text("text").notNullable();
    table.text("image_url").notNullable();

    table.timestamps(true, true);
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("posts");
