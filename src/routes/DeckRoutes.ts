import DeckController from "@controllers/DeckController";
import { Router } from "express";

const DeckRouter = Router();

DeckRouter.route("/").post(DeckController.create);

DeckRouter.route("/:deckId").get(DeckController.read);

DeckRouter.route("/:deckId").patch(DeckController.update);

DeckRouter.route("/:deckId").delete(DeckController.delete);

DeckRouter.route("/cards/:deckId").get(DeckController.getCardsFromDeck);

export default DeckRouter;
