import Knex from "knex";

export async function seed(knex: Knex) {
  return await knex("food").insert([
    { title: "Batatinhas", image: "batatinhas.png" },
    { title: "Cachorroquente", image: "cachorroquente.png" },
    { title: "Coxinhas", image: "coxinhas.png" },
    { title: "Espetinho", image: "espetinho.png" },
    { title: "Hamburger", image: "hamburger.png" },
    { title: "Macarrão", image: "macarrao.png" },
    { title: "Pizza", image: "pizza.png" },
    { title: "Refrigerante", image: "refri.png" },
    { title: "Mini Salgadinhos", image: "nugets.png" },
    { title: "Rosquinha", image: "rosquinha.png" },
    { title: "Salgadinho", image: "salgadinho.png" },
    { title: "Sorvete", image: "sorvete.png" },
  ]);
}
