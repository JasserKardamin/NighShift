import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  //const token = req.header("Authorization");
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

export const UserRoleMiddleware =
  (requiredRole: string) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user.role !== requiredRole)
      return res.status(403).json({ message: "Access forbidden" });
    next();
  };
