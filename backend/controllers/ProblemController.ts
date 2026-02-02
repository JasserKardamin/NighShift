import { IProblem } from "../models/Problem";
import * as problemService from "../services/ProblemService";
import { Request, Response } from "express";

export const getAllProblems = async (req: Request, res: Response) => {
  const Problems = await problemService.getAll();
  res.json(Problems);
};

export const createProblem = (
  req: Request<{}, {}, IProblem>,
  res: Response,
) => {
  const problemData = req.body;
  const problemCreated = problemService.createProblem(problemData);
  problemCreated
    ? res.status(200).json({ message: "Problem created !" })
    : res.status(400).json({ message: "oops something went wrong!" });
};
