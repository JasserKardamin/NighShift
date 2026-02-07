import { IProblem, Problem } from "../models/Problem";

export const getAll = async () => {
  return await Problem.find();
};

export const findProblem = async (field: string, value: string) => {
  return await Problem.findOne({ [field]: value });
};

export const createProblem = (problem: IProblem) => {
  return Problem.create(problem);
};
