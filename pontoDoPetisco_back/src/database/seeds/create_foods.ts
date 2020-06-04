import Knex from "knex";

export async function seed(knex: Knex) {
  return await knex("food").insert([
    { title: "coxinha", image: "coxinha.jpg" },
    { title: "pastel", image: "pastel.jpg" },
    { title: "Esfirra", image: "coxinha.svg" },
    { title: "Quibe", image: "coxinha.svg" },
    { title: "Dobradinha", image: "coxinha.svg" },
  ]);
}
