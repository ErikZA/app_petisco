import { Request, Response } from "express";
import knex from "../database/connection";

class FoodsController {
  async index(request: Request, response: Response) {
    const foods = await knex("food").select("*");

    const serializedFoods = foods.map((food) => {
      return {
        id: food.id,
        title: food.title,
        image_url: `http://localhost:3333/${food.image}`,
      };
    });
    return response.json(serializedFoods);
  }
}

export default FoodsController;
