import * as submissionController from "../controllers/SubmissionController";
import Router from "express";

const SumissionRouter = Router();

SumissionRouter.get("/getAll", submissionController.getAllSubmission);
SumissionRouter.post("/create", submissionController.createSubmission);

export default SumissionRouter;
