import { Router } from "express";
import { getMe } from "../controllers/getMe.js";
import checkMeAuth from "../utils/checkMeAuth.js";

const GetMeRoute = new Router();

GetMeRoute.get("/get-me", checkMeAuth, getMe);

export default GetMeRoute;
