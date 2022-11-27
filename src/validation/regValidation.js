import { body } from "express-validator";

export const regValidation = [
  body("userName", "min 1 symbol").isLength({ min: 1 }),
  body("email", "bad format email").isEmail(),
  body("password", "min 1 symbol").isLength({ min: 1 }),
  body("localRegDate", "min 12 symbol").isLength({ min: 12 }),
  body("localLoginDate", "min 12 symbol").isLength({ min: 12 }),
];
