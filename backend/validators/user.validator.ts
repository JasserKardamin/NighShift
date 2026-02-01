import { body } from "express-validator";

// User register validator
export const registerValidator = [
  body("email").isEmail().withMessage("Invalid Email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 caracters"),
  body("username").notEmpty().withMessage("Invalid Username"),
];

export const loginValidator = [
  body("email").isEmail().withMessage("Invalid Email"),
];
