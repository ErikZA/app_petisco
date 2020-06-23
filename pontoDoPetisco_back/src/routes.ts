import express from "express";
import { celebrate, Joi } from "celebrate";
import multer from "multer";
import multerConfig from "./config/multer";
import PointsController from "./controllers/PointsController";
import FoodsController from "./controllers/FoodsController";

const routes = express.Router();
const pointsController = new PointsController();
const foodsController = new FoodsController();

const upload = multer(multerConfig);

routes.get("/", (request, response) => {
  return response.json({ message: "system" });
});

routes.get("/foods", foodsController.index);

routes.get("/points/:id", pointsController.show);

routes.get("/points", pointsController.index);

routes.post(
  "/points",
  upload.single("image"),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        UF: Joi.string().required().max(2).min(2),
        number: Joi.number().required(),
        foods: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  pointsController.create
);

export default routes;
