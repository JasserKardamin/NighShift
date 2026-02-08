import { IProblem } from "../models/Problem";
import * as problemService from "../services/ProblemService";
import { Request, Response } from "express";
import { createTmp } from "../utils/CreateTmp";
import { runDockerJS } from "../services/runDocker";
import { promises as fs } from "fs";
import path from "path";
import { error } from "console";

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

  console.log("user code : ", userCode);

  const execCode = execObj ? execObj.code : "";
  const tempFileInfo = await createTmp(userCode, language, execCode);
  try {
    const results = [];
    for (const test of prob.testCases) {
      const { stdout, error } = await runDockerJS(
        tempFileInfo.codePath,
        test.input,
        language,
      );

      // Parse both and compare as JSON objects
      let passed = false;
      try {
        const actualOutput = JSON.parse(stdout);

        const expectedOutput = JSON.parse(test.output);
        passed =
          JSON.stringify(actualOutput) === JSON.stringify(expectedOutput);
      } catch {
        // Fallback to string comparison if not valid JSON
        passed = stdout === test.output;
      }

      results.push({
        passed,
        expected: test.isHidden ? undefined : test.output,
        received: test.isHidden ? undefined : stdout,
      });
      if (!passed && test.isHidden) break;
    }
    res.status(200).json({
      message: "user code executed!",
      results,
    });
  } catch (error) {
    console.error("Error executing code:", error);
    res.status(500).json({ message: "Error executing code" });
  } finally {
    try {
      const tempDir = path.dirname(tempFileInfo.codePath);
      await fs.rm(tempDir, { recursive: true, force: true });
      console.log(`[Cleanup] Removed temp directory: ${tempDir}`);
    } catch (cleanupError) {
      console.error("[Cleanup] Failed to remove temp directory:", cleanupError);
    }
  }
};
