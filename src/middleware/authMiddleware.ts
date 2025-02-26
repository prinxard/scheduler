import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = "$2a$12$USM/2SNqm83qxkwrvcLWp.GaBjc/KCnIbhsfXuYhKx/VMi8P8pkYO"; // Use an env variable in production

export interface AuthRequest extends Request {
  userId?: number;
}

export const authenticateUser = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: number };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
    return;
  }
};
