import { body } from "express-validator";

// User register validator
export const registerValidator = [
  body("email").isEmail().withMessage("Invalid Email"!),
  body("password").isLength({ min: 8 }),
  body("username").notEmpty(),
];
