import * as submissionService from "../services/SubmissionService";
import { Request, Response } from "express";
import { SubmissionI } from "../models/Submission";

export const getAllSubmission = async (req: Request, res: Response) => {
  try {
    const allSubmissions = await submissionService.getAllSubmission();
    if (!allSubmissions) {
      throw new Error("no Sumissions found ");
    }
    res.status(200).json({
      message: `${allSubmissions.length} submisstion found `,
      submissions: allSubmissions,
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const createSubmission = (
  req: Request<{}, {}, { submission: SubmissionI }>,
  res: Response,
) => {
  try {
    const { submission } = req.body;
    const result = submissionService.createSubmission(submission);
    if (!result) {
      throw new Error("submission did not get registred");
    }
    res.status(200).json({ message: "Submission created" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
