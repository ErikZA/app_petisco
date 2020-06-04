import Knex from "knex";

export async function up(knex: Knex) {
  return await knex.schema.createTable("food", (table) => {
    table.increments("id");
    table.string("image").notNullable();
    table.string("title").notNullable();
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable("food");
}
