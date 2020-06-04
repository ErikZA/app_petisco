import Knex from "knex";

export async function up(knex: Knex) {
  return await knex.schema.createTable("point", (table) => {
    table.increments("id");
    table.string("image").notNullable();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("whatsapp").notNullable();
    table.string("latitude").notNullable();
    table.string("longitude").notNullable();
    table.string("number").notNullable();
    table.string("city").notNullable();
    table.string("UF", 2).notNullable();
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable("point");
}
