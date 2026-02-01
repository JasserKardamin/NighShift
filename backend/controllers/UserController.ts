import mongoose from "mongoose";
import { IUser } from "../models/User";
import * as userService from "../services/UserService";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const GetAllUsers = async (req: Request, res: Response) => {
  const users = await userService.findAllUsers();
  res.json(users);
};

export const GetUserByEmail = async (
  req: Request<{ email: string }, {}, {}>,
  res: Response,
) => {
  try {
    const email = req.params.email;

    const userToFind = await userService.findOneBy("email", email);

    if (!userToFind) {
      res.status(404).json({ message: "User not found" });
    }

    res.json({ user: userToFind, message: "User found " });
  } catch (err) {
    res.status(400).json({ message: "Invalid User ID" });
  }
};

export const CreateUser = async (
  req: Request<{}, {}, IUser>,
  res: Response,
) => {
  try {
    // this line here reads the validator buffer for detected errors
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const userData = req.body;
    const result = userService.createUser(userData);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong !" });
  }
};

export const DelteUser = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
) => {
  try {
    const id = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const userToDelete = await userService.findUserById(id);
    if (!userToDelete) {
      return res.status(404).json({ message: "User not found !" });
    }
    const deletingResult = await userService.delteUser(id);
    res.send(deletingResult);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "something went wrong ! " });
  }
};

export const UserLogin = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response,
) => {
  const { email, password } = req.body;
  try {
    const findUser = await userService.findOneBy("email", email);
    if (!findUser)
      return res
        .status(404)
        .json({ field: "email", message: "Invalid User Credentials !" });

    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ field: "password", message: "Password Incorrect !" });

    const token = jwt.sign(
      { id: findUser._id, role: findUser.role },
      process.env.JWTSECRET,
      { expiresIn: "1h" },
    );

    // Set cookie with the token in the back end
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ token, message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

export const UserProfile = (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Profile loaded fine ! ",
  });
};
