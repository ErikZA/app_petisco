import { Request, Response } from "express";
import knex from "../database/connection";

class PointsController {
  async index(request: Request, response: Response) {
    const { city, UF, items } = request.query;

    const parsedFoods = String(items)
      .split(",")
      .map((food) => food.trim());

    const points = await knex("point")
      .join("point_foods", "point.id", "=", "point_foods.point.id")
      .whereIn("point_foods.food_id", parsedFoods)
      .where("city", String(city))
      .where("UF", String(UF))
      .distinct()
      .select("point.*");

    response.json(points);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const point = await knex("point").where("id", id).first();
    if (!point) {
      return response.status(400).json({ message: "Point not found" });
    }

    const items = await knex("food")
      .join("point_foods", "food.id", "=", "point_foods.food_id")
      .where("point_foods.food_id", id)
      .select("food.title");

    return response.json(point);
  }

  async create(request: Request, response: Response) {
    const {
      image,
      name,
      email,
      whatsapp,
      number,
      UF,
      city,
      latitude,
      longitude,
      foods,
    } = request.body;

    const trx = await knex.transaction();

    const point = {
      image: "fake.png",
      name,
      email,
      whatsapp,
      number,
      UF,
      city,
      latitude,
      longitude,
    };

    const insertedIds = await trx("point").insert(point);
    const point_id = insertedIds[0];
    const pointFoods = foods.map((food: Number) => {
      return {
        point_id: point_id,
        food_id: food,
      };
    });

    await trx("point_foods").insert(pointFoods);
    await trx.commit();

    return response.json({
      id: point_id,
      ...point,
    });
  }
}

export default PointsController;
