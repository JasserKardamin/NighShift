import express from "express";
import * as problemController from "../controllers/ProblemController";
import { registerValidator } from "../validators/user.validator";
import {
  authMiddleware,
  UserRoleMiddleware,
} from "../middlewares/AuthUser.middleware";

const router = express.Router();

//public routes
router.get("/getAll", authMiddleware, problemController.getAllProblems);
router.post("/create", problemController.createProblem);
router.get(
  "/getBySlug/:slug",
  authMiddleware,
  problemController.getProblemWithSlug,
);

router.post("/test", problemController.runUserCode);
export default router;
