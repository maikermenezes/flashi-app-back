import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { CardRepository, DeckRepository } from "../repositories"; // Assuming you will have a DeckRepository similar to UserRepository
import { Deck } from "../DTOs"; // Assuming Deck is part of DTOs
import notNull from "src/utils/notNull";
import { UserRepository } from "../repositories"; // Importing for verifying user existence

class DeckController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, userId } = req.body;

      const userRepository = getCustomRepository(UserRepository);
      const user = await userRepository.findOne(userId);

      if (!user) {
        return next({
          status: 404,
          message: "User not found",
        });
      }

      const deckRepository = getCustomRepository(DeckRepository);

      const deckData = {
        name,
        userId,
      };

      // Assuming Deck has a validate method similar to User
      const { error } = Deck.validate(deckData);

      if (error) {
        return next({
          status: 400,
          message: error.details,
        });
      }

      const deck = await deckRepository.save(deckData);

      res.locals = {
        status: 201,
        message: "Deck created",
        data: deck,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { deckId } = req.params;

      const deckRepository = getCustomRepository(DeckRepository);

      const deck = await deckRepository.findOne(deckId); // Including user relation

      if (!deck) {
        return next({
          status: 404,
          message: "Deck not found",
        });
      }

      res.status(200).json(deck);

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { deckId } = req.params;

      const deckRepository = getCustomRepository(DeckRepository);

      const deck = await deckRepository.findOne(deckId);

      if (!deck) {
        return next({
          status: 404,
          message: "Deck not found",
        });
      }

      const newAttributes = notNull(req.body);
      const newDeckInfo = { ...deck, ...newAttributes };

      // Validate if a new userId is provided and if the user exists
      if (newAttributes.userId) {
        const user = await getCustomRepository(UserRepository).findOne(
          newAttributes.userId
        );
        if (!user) {
          return next({
            status: 404,
            message: "User not found for provided userId",
          });
        }
      }

      await deckRepository.save(newDeckInfo);

      res.locals = {
        status: 200,
        message: "Deck updated successfully",
        data: newDeckInfo,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { deckId } = req.params;

      const deckRepository = getCustomRepository(DeckRepository);

      const deck = await deckRepository.findOne(deckId);

      if (!deck) {
        return next({
          status: 404,
          message: "Deck not found",
        });
      }

      await deckRepository.remove(deck);

      res.locals = {
        status: 200,
        message: "Deck deleted successfully",
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getCardsFromDeck(req: Request, res: Response, next: NextFunction) {
    try {
      const { deckId } = req.params;

      const deckRepository = getCustomRepository(DeckRepository);
      const cardRepository = getCustomRepository(CardRepository);

      const deck = await deckRepository.findOne(deckId);
      if (!deck) {
        return next({
          status: 404,
          message: "Deck not found",
        });
      }

      let cards = await cardRepository.find({ where: { deckId } });

      if (!cards?.length) {
        cards = [];
      }

      res.status(200).json(cards);

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new DeckController();
