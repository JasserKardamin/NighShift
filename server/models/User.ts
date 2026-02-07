import { Schema, model, Document } from "mongoose";

// user Registration interface

export interface IUserRegister {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Interface for a User document
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  role: string;

  // stats :
  lumens: number;
  totalSolved: number;
  globalRank: number;
  currentStreak: number;
  longestStreak: number;
}

// Define the User schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    default: "User",
  },

  // stats :
  lumens: {
    type: Number,
    default: 5,
  },
  totalSolved: {
    type: Number,
    default: 0,
  },
  globalRank: {
    type: Number,
    default: 1000,
  },
  currentStreak: {
    type: Number,
    default: 0,
  },
  longestStreak: {
    type: Number,
    default: 0,
  },
});

// Create the User model from the schema
export const User = model<IUser>("User", userSchema);
