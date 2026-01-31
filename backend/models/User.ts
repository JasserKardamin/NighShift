import { Schema, model, Document } from "mongoose";

// Interface for a User document
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  role: string;
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
});

// Create the User model from the schema
export const User = model<IUser>("User", userSchema);
