import { body } from "express-validator";

export const authValidation = [
  body("email", "bad format email").isEmail(),
  body("password", "min 1 symbol").isLength({ min: 1 }),
  body("localLoginDate", "min 12 symbol").isLength({ min: 12 }),
];
