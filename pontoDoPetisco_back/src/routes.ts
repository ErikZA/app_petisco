import express from "express";

import PointsController from "./controllers/PointsController";
import FoodsController from "./controllers/FoodsController";

const routes = express.Router();
const pointsController = new PointsController();
const foodsController = new FoodsController();

routes.get("/", (request, response) => {
  return response.json({ message: "system" });
});

routes.get("/foods", foodsController.index);

routes.get("/points/:id", pointsController.show);

routes.get("/points", pointsController.index);

routes.post("/points", pointsController.create);

export default routes;
