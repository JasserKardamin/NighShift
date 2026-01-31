import { ObjectId, Types } from "mongoose";
import { IUser, User } from "../models/User";
import bcrypt from "bcryptjs";

export const findAllUsers = () => {
  return User.find();
};

export const findUserById = (id: string) => {
  return User.findById(id);
};

export const findOneBy = async (field: string, value: any) => {
  return User.findOne({ [field]: value });
};

export const createUser = async (user: IUser) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const userWithHashedPassword = {
    ...user,
    password: hashedPassword,
  };
  return User.create(userWithHashedPassword);
};

export const delteUser = (id: string) => {
  return User.findByIdAndDelete(id);
};
