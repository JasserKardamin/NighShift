import { model, Schema, Types } from "mongoose";
import { Problem } from "./Problem";

export interface SubmissionI {
  userId: Types.ObjectId;
  problemId: Types.ObjectId;
  language: "js" | "cpp" | "java" | "python";
  code: string;
  submittedAt: Date;
  executionTime?: number;
  memoryUsed?: number;
}

const submissionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  problemId: {
    type: Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
    index: true,
  },
  language: {
    type: String,
    enum: ["js", "cpp", "java", "python"],
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  executionTime: {
    type: Number,
  },
  memoryUsed: {
    type: Number,
  },
});

// I can write my inedxes

// exorting the schema
export const Submission = model<SubmissionI>("Submission", submissionSchema);
