import express from "express";
import * as UserController from "../controllers/UserController";
import { registerValidator } from "../validators/user.validator";
import {
  authMiddleware,
  UserRoleMiddleware,
} from "../middlewares/AuthUser.middleware";

const router = express.Router();

//public routes
router.post("/login", UserController.UserLogin);
router.post("/create", registerValidator, UserController.CreateUser);
router.get("/logout", UserController.UserLogOut);

// protected routes
router.get("/profile", authMiddleware, UserController.UserProfile);
router.get("/", UserRoleMiddleware("admin"), UserController.GetAllUsers);
router.get(
  "/getUserByEmail/:email",
  authMiddleware,
  UserController.GetUserByEmail,
);
router.delete(
  "/delete/:id",
  authMiddleware,
  UserRoleMiddleware("admin"),
  UserController.DelteUser,
);

//auth routes
router.get("/auth", UserController.getCurrentUser);
export default router;
