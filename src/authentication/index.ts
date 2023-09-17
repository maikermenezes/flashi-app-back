import UserRepository from "@repositories/UserRepository";
import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import jwt from "jsonwebtoken";
import User from "@models/User";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const userRepository = getCustomRepository(UserRepository);
  const user = (await userRepository.findByEmail(email)) as User | false;

  if (!user) {
    return next({
      status: 404,
      message: "User not registered",
    });
  }
  if (password !== user?.password) {
    return next({
      status: 401,
      message: "Wrong password",
    });
  }

  const accessToken = jwt.sign(user?.id, process.env.ACCESS_TOKEN_SECRET);
  res.locals = {
    status: 200,
    data: { user: user, token: accessToken },
  };

  return next();
};

export const recoverUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split("")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, userId) => {
    if (err) return res.sendStatus(403);

    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(userId);

    if (!user) {
      return next({
        status: 404,
        message: "User not found",
      });
    } else {
      res.locals = {
        status: 200,
        data: user,
      };

      return next();
    }
  });
};
