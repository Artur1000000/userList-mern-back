import { Router } from "express";
import { auth } from "../controllers/auth.js";
import { authValidation } from "../validation/authValidation.js";

const AuthRoute = new Router();

AuthRoute.post("/auth", authValidation, auth);

export default AuthRoute;
