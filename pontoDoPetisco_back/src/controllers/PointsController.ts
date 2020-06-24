import { Request, Response } from "express";
import knex from "../database/connection";

class PointsController {
  async index(request: Request, response: Response) {
    const { city, UF, items } = request.query;
    const parsedFoods = String(items)
      .split(",")
      .map((food) => food.trim());

    const points = await knex("point")
      .join("point_foods", "point.id", "=", "point_foods.point_id")
      .whereIn("point_foods.food_id", parsedFoods)
      .where("city", String(city))
      .where("UF", String(UF))
      .distinct()
      .select("point.*");
    const serializedPoints = points.map((point) => {
      return {
        ...point,
        image_url: `https://backpontodopetisco.herokuapp.com/uploads/${point.image}`,
      };
    });

    response.json(serializedPoints);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    console.log(id);
    const point = await knex("point").where("id", id).first();
    if (!point) {
      return response.status(400).json({ message: "Point not found" });
    }

    const items = await knex("food")
      .join("point_foods", "food.id", "=", "point_foods.food_id")
      .where("point_foods.point_id", id)
      .select("food.title");

    const serializedPoint = {
      ...point,
      image_url: `https://backpontodopetisco.herokuapp.com/uploads/${point.image}`,
    };

    return response.json({ point: serializedPoint, items: items });
  }

  async create(request: Request, response: Response) {
    const {
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
      image: request.file.filename,
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
    const pointFoods = foods
      .split(",")
      .map((item: string) => item.trim())
      .map((food: Number) => {
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
      statusCode: 200,
    });
  }
}

export default PointsController;
