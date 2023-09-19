import { Router } from "express";
import { UserController } from "../controllers";

const userRouter = Router();

userRouter.route("/").post(UserController.create);

userRouter.route("/:userId").get(UserController.read);

userRouter.route("/:userId").patch(UserController.update);

userRouter.route("/:userId").delete(UserController.delete);

userRouter.route("/decks/:userId").get(UserController.getUserDecks);

userRouter.route("/cards/:userId").get(UserController.getUserCards);

export default userRouter;
