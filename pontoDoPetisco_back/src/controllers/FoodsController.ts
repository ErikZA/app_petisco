import { Request, Response } from "express";
import knex from "../database/connection";
import os from "os";

class FoodsController {
  async index(request: Request, response: Response) {
    const foods = await knex("food").select("*");
    os.hostname();
    const serializedFoods = foods.map((food) => {
      return {
        id: food.id,
        title: food.title,
        image_url: `https://backpontodopetisco.herokuapp.com/temp/${food.image}`,
      };
    });
    return response.json(serializedFoods);
  }
}

export default FoodsController;
