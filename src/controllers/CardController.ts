import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { CardRepository } from "../repositories"; // Assuming you have a CardRepository
import { Card } from "../DTOs"; // Assuming Card is part of DTOs
import notNull from "src/utils/notNull";
import { DeckRepository } from "../repositories"; // Importing for verifying deck existence

class CardController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { phrase, translation, image, deckId } = req.body;

      const deckRepository = getCustomRepository(DeckRepository);
      const deck = await deckRepository.findOne(deckId);

      if (!deck) {
        return next({
          status: 404,
          message: "Deck not found",
        });
      }

      const cardRepository = getCustomRepository(CardRepository);

      const cardData = {
        phrase,
        translation,
        image,
        deckId,
      };

      // Assuming Card has a validate method similar to Deck and User
      const { error } = Card.validate(cardData);

      if (error) {
        return next({
          status: 400,
          message: error.details,
        });
      }

      const card = await cardRepository.save(cardData);

      res.locals = {
        status: 201,
        message: "Card created",
        data: card,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { cardId } = req.params;

      const cardRepository = getCustomRepository(CardRepository);

      const card = await cardRepository.findOne(cardId, {
        relations: ["deck"],
      });

      if (!card) {
        return next({
          status: 404,
          message: "Card not found",
        });
      }

      res.status(200).json(card);

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { cardId } = req.params;

      const cardRepository = getCustomRepository(CardRepository);

      const card = await cardRepository.findOne(cardId);

      if (!card) {
        return next({
          status: 404,
          message: "Card not found",
        });
      }

      const newAttributes = notNull(req.body);
      const newCardInfo = { ...card, ...newAttributes };

      if (newAttributes.deckId) {
        const deck = await getCustomRepository(DeckRepository).findOne(
          newAttributes.deckId
        );
        if (!deck) {
          return next({
            status: 404,
            message: "Deck not found for provided deckId",
          });
        }
      }

      await cardRepository.save(newCardInfo);

      res.locals = {
        status: 200,
        message: "Card updated successfully",
        data: newCardInfo,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { cardId } = req.params;

      const cardRepository = getCustomRepository(CardRepository);

      const card = await cardRepository.findOne(cardId);

      if (!card) {
        return next({
          status: 404,
          message: "Card not found",
        });
      }

      await cardRepository.remove(card);

      res.locals = {
        status: 200,
        message: "Card deleted successfully",
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new CardController();
