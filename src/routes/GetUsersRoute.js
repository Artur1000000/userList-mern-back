import { Router } from "express";
import { getUsers } from "../controllers/getUsers.js";
import checkMeAuth from "../utils/checkMeAuth.js";

const GetUsersRoute = new Router();

GetUsersRoute.get("/users", checkMeAuth, getUsers);

export default GetUsersRoute;
