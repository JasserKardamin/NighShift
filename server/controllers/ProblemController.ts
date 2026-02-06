import { IProblem } from "../models/Problem";
import * as problemService from "../services/ProblemService";
import { Request, Response } from "express";
import { createTmp } from "../utils/CreateTmp";
import { runDockerJS } from "../services/runDocker";

export const getAllProblems = async (req: Request, res: Response) => {
  const problems = await problemService.getAll();
  res.json(problems);
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
  const problem = await problemService.findProblem("slug", problemSlug);
  res.json(problem);
};

export const runUserCode = async (
  req: Request<{}, {}, { userCode: string; language: string; prob: IProblem }>,
  res: Response,
) => {
  const { userCode, language, prob } = req.body;

  const execObj = prob.executionCode.find((item) => item.language === language);
  const execCode = execObj ? execObj.code : "";

  const tempFileInfo = await createTmp(userCode, language, execCode);

  const results = [];

  for (const test of prob.testCases) {
    const { stdout, error } = await runDockerJS(
      tempFileInfo.codePath,
      test.input,
    );

    const passed = stdout === test.output;

    results.push({
      passed,
      expected: test.isHidden ? undefined : test.output,
      received: test.isHidden ? undefined : stdout,
    });

    console.log(results);

    if (!passed && test.isHidden) break; // optional optimization
  }

  res.status(200).json({ messge: "user code received ! " });
};
