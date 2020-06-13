import Knex from "knex";

export async function seed(knex: Knex) {
  return await knex("food").insert([
    { title: "batatinhas", image: "batatinhas.png" },
    { title: "cachorroquente", image: "cachorroquente.png" },
    { title: "coxinhas", image: "coxinhas.png" },
    { title: "espetinho", image: "espetinho.png" },
    { title: "hamburger", image: "hamburger.png" },
    { title: "macarrao", image: "macarrao.png" },
    { title: "pizza", image: "pizza.png" },
    { title: "refri", image: "refri.png" },
    { title: "rosquinha", image: "rosquinha.png" },
    { title: "salgadinho", image: "salgadinho.png" },
    { title: "sorvete", image: "sorvete.png" },
  ]);
}
