import { Router } from "express";
import { reg } from "../controllers/reg.js";
import { regValidation } from "../validation/regValidation.js";

const RegRoute = new Router();

RegRoute.post("/reg", regValidation, reg);

export default RegRoute;
