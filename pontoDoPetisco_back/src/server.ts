import express from "express";
import cors from "cors";
import routes from "./routes";
import path from "path";
import { errors } from "celebrate";
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use("/temp", express.static(path.resolve(__dirname, "..", "temp")));

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.use(errors());

app.listen(process?.env?.PORT || 3333);
