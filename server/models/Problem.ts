import { model, Schema } from "mongoose";

export interface IProblem {
  title: string;
  slug: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  statement: string;
  inputDescription: string;
  outputDescription: string;
  reward: number;
  constraints: string[];

  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];

  starterCode: {
    language: "js" | "cpp" | "java" | "python";
    code: string;
  }[];

  testCases: {
    input: string;
    output: string;
    isHidden: boolean;
  }[];
  executionCode: {
    language: "js" | "cpp" | "java" | "python";
    code: string;
  }[];
  stats: {
    submissions: number;
    accepted: number;
  };

  createdAt: Date;
}

const problemSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  tags: [String],

  statement: { type: String, required: true },

  inputDescription: String,
  outputDescription: String,
  constraints: [String],
  reward: Number,

  examples: [
    {
      input: String,
      output: String,
      explanation: String,
    },
  ],

  starterCode: [
    {
      language: String,
      code: String,
    },
  ],

  testCases: [
    {
      input: String,
      output: String,
      isHidden: Boolean,
    },
  ],
  executionCode: [
    {
      language: String,
      code: String,
    },
  ],

  stats: {
    submissions: { type: Number, default: 0 },
    accepted: { type: Number, default: 0 },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the User model from the schema
export const Problem = model<IProblem>("Problem", problemSchema);
