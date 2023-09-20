import CardController from "@controllers/CardController";
import { Router } from "express";

const CardRouter = Router();

CardRouter.route("/").post(CardController.create);

CardRouter.route("/:cardId").get(CardController.read);

CardRouter.route("/:cardId").patch(CardController.update);

CardRouter.route("/:cardId").delete(CardController.delete);

export default CardRouter;
