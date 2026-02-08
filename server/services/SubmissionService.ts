import { Submission, SubmissionI } from "../models/Submission";

export const getAllSubmission = async () => {
  return await Submission.find();
};

export const getSubmissionBy = async (field: string, value: any) => {
  return await Submission.findOne({ [field]: value });
};

export const createSubmission = (sub: SubmissionI) => {
  return Submission.create(sub);
};

export const deleteSubmission = async (id: string) => {
  return await Submission.findByIdAndDelete(id);
};
