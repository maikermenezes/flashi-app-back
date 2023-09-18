import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import jwt from "jsonwebtoken";
import User from "@models/User";
import UserRepository from "@repositories/UserRepository";

class AuthenticationController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
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

      const { password: notUsed, ...userWithoutPassword } = user;

      const accessToken = jwt.sign(user?.id, process.env.ACCESS_TOKEN_SECRET);
      res.status(200).json({ user: userWithoutPassword, token: accessToken });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async recoverUserInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) return res.sendStatus(401);

      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, userId) => {
          if (err) return res.sendStatus(403);

          const userRepository = getCustomRepository(UserRepository);
          const user = await userRepository.findById(userId);

          if (!user) {
            return next({
              status: 404,
              message: "User not found",
            });
          } else {
            const { password: notUsed, ...userWithoutPassword } = user as User;

            res.status(200).json({ user: userWithoutPassword });

            return next();
          }
        }
      );
    } catch (error) {
      return next(error);
    }
  }
}

export default new AuthenticationController();
