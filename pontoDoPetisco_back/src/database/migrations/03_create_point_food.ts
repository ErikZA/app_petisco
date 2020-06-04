import Knex from "knex";

export async function up(knex: Knex) {
  return await knex.schema.createTable("point_foods", (table) => {
    table.increments("id").primary();
    table.integer("point_id").unsigned().notNullable();
    table.integer("food_id").unsigned().notNullable();
    table.foreign("point_id").references("id").inTable("point");
    table.foreign("food_id").references("id").inTable("food");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable("point_foods");
}
