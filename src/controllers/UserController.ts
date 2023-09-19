import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import {
  CardRepository,
  DeckRepository,
  UserRepository,
} from "../repositories";
import { User } from "../DTOs";
import notNull from "src/utils/notNull";

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;

      const userRepository = getCustomRepository(UserRepository);

      const userData = {
        name,
        email,
        password,
      };

      const { error } = User.validate(userData);

      if (error) {
        return next({
          status: 400,
          message: error.details,
        });
      }

      const checkEmail = await userRepository.findByEmail(email);

      if (checkEmail) {
        return next({
          status: 400,
          message: "This email is already registred",
        });
      }

      const user = await userRepository.save(userData);

      res.locals = {
        status: 201,
        message: "User created",
        data: user,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const email = req.query.email as string;

      let user = undefined;

      const userRepository = getCustomRepository(UserRepository);

      if (userId) {
        user = await userRepository.findById(userId);
      } else {
        user = await userRepository.findByEmail(email);
      }

      if (!user) {
        return next({
          status: 404,
          message: "User not found",
        });
      }

      if (user === "ERROR") {
        return next({
          status: 400,
          message: "Incorrect parameters",
        });
      }

      res.status(200).json(user);

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const userRepository = getCustomRepository(UserRepository);

      const user = await userRepository.findOne(userId);

      if (!user) {
        return next({
          status: 404,
          message: "User not found",
        });
      }

      const newAttributes = notNull(req.body);
      const newUserInfo = { ...user, ...newAttributes };

      await userRepository.save(newUserInfo);

      res.locals = {
        status: 200,
        message: "User updated successfully",
        data: newUserInfo,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const userRepository = getCustomRepository(UserRepository);

      const user = await userRepository.findOne(userId);

      if (!user) {
        return next({
          status: 404,
          message: "User not found",
        });
      }

      await userRepository.remove(user);

      res.locals = {
        status: 200,
        message: "User deleted successfully",
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getUserDecks(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const userRepository = getCustomRepository(UserRepository);

      const user = await userRepository.findOne(userId);

      if (!user) {
        return next({
          status: 404,
          message: "User not found",
        });
      }

      const deckRepository = getCustomRepository(DeckRepository);

      const decks = await deckRepository.find({ userId }); // Get all decks associated with the provided userId

      if (!decks || decks.length === 0) {
        return next({
          status: 404,
          message: "No decks found for the provided user",
        });
      }

      res.status(200).json(decks);

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getUserCards(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const userRepository = getCustomRepository(UserRepository);
      const deckRepository = getCustomRepository(DeckRepository);
      const cardRepository = getCustomRepository(CardRepository);

      // Check if the user exists
      const user = await userRepository.findOne(userId);
      if (!user) {
        return next({
          status: 404,
          message: "User not found",
        });
      }

      const userDecks = await deckRepository.find({ where: { userId } });

      if (!userDecks.length) {
        return next({
          status: 404,
          message: "No decks found for the specified user",
        });
      }

      const userDecksIds = userDecks.map((deck) => deck.id);
      const cards = await cardRepository
        .createQueryBuilder("card")
        .where("card.deckId IN (:...userDecksIds)", { userDecksIds })
        .getMany();

      if (!cards?.length) {
        return next({
          status: 404,
          message:
            "No cards found for the decks associated with the specified user",
        });
      }

      res.status(200).json(cards);

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserController();
