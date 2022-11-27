import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import AuthRoute from "./src/routes/AuthRoute.js";
import RegRoute from "./src/routes/RegRoute.js";
import GetMeRoute from "./src/routes/GetMeRoute.js";
import GetUsersRoute from "./src/routes/GetUsersRoute.js";
import {
  BlockUsersRoute,
  DeleteUsersRoute,
  UnblockUsersRoute,
} from "./src/routes/ActionUsersRouter.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;
const DB_USER = process.env.userDB;
const DB_PASSWORD = process.env.passwordDB;
const DB_NAME = process.env.nameDB;

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.eo8lgvy.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error ", err));

app.use(cors());

app.use(express.json());

app.use("/api", AuthRoute);

app.use("/api", RegRoute);

app.use("/api", GetMeRoute);

app.use("/api", GetUsersRoute);

app.use("/api", BlockUsersRoute);

app.use("/api", UnblockUsersRoute);

app.use("/api", DeleteUsersRoute);

app.get("/", (req, res) => {
  res.status(200).json({ message: "ok" });
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server started on port:${PORT}`);
});
