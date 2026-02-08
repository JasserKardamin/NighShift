import mongoose from "mongoose";
import { IUser, IUserRegister } from "../models/User";
import * as userService from "../services/UserService";
import { Request, Response } from "express";
import { cookie, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

const SESSION_DURATION = 4 * 60 * 60 * 1000; // 4 hours
const REMEMBER_ME_DURATION = 3 * 24 * 60 * 60 * 1000; // 3 days

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
  req: Request<{}, {}, IUserRegister>,
  res: Response,
) => {
  try {
    // this line here reads the validator buffer for detected errors
    const errors = validationResult(req);
    //console.log(errors);

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
  req: Request<
    {},
    {},
    { email: string; password: string; rememberMe: boolean }
  >,
  res: Response,
) => {
  const { email, password, rememberMe } = req.body;

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

    // setting the cookie age (for a session or a remember me action )
    const cookieAge = rememberMe ? REMEMBER_ME_DURATION : SESSION_DURATION;

    // Set cookie with the token in the back end
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: cookieAge,
    });

    // buidling a public safe user :
    const PublicUser = {
      username: findUser.username,
      email: findUser.email,
      role: findUser.role,
      // stats
      lumens: findUser.lumens,
      totalSolved: findUser.totalSolved,
      globalRank: findUser.globalRank,
      currentStreak: findUser.currentStreak,
      longestStreak: findUser.longestStreak,
    };

    res.status(200).json({
      token,
      user: PublicUser,
      message: "Logged in successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWTSECRET) as JwtPayload;
    const user = await userService
      .findUserById(decoded.id)
      .select("_id username email role lumens");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
};

export const UserProfile = (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Profile loaded fine ! ",
  });
};

export const UserLogOut = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });
  res.status(200).json({ message: "Logged out" });
};

export const addLumensToUser = async (
  req: Request<{}, {}, { userId: string; lumens: number }>,
  res: Response,
) => {
  try {
    const { userId, lumens } = req.body;
    const result = await userService.updateUser(userId, lumens);
    if (!result) {
      throw new Error("something went wrong ");
    }
    res.status(200).json({ messag: "lumens added !" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
