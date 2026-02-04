import { body } from "express-validator";
import * as userService from "../services/UserService";
// User register validator
export const registerValidator = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .bail()
    .custom(async (username) => {
      const existingUser = await userService.findOneBy("username", username);
      if (existingUser) {
        throw new Error("Username is already in use !");
      }
      return true;
    }),
  body("email")
    .isEmail()
    .withMessage("Invalid Email")
    .bail()
    .custom(async (email) => {
      const existingUser = await userService.findOneBy("email", email);
      if (existingUser) {
        throw new Error("Email already in use !");
      }
      return true;
    }),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords must match"),
];

export const loginValidator = [
  body("email").isEmail().withMessage("Invalid Email"),
];
