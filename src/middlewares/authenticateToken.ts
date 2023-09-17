import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// middleware for authentication
// when successful, it adds userId to req.body
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split("")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userId) => {
    if (err) return res.sendStatus(403);
    req.body.userId = userId;

    next();
  });
};
