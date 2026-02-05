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

export const getProblemWithSlug = async (
  req: Request<{ slug: string }, {}, {}>,
  res: Response,
) => {
  const problemSlug = req.params.slug;
  const Problem = await problemService.findProblem("slug", problemSlug);
  res.json(Problem);
};

export const runUserCode = async (
  req: Request<{}, {}, { userCode: string }>,
  res: Response,
) => {
  const { userCode } = req.body;

  console.log(userCode);
  res.status(200).json({ messge: "user code received ! " });
};
