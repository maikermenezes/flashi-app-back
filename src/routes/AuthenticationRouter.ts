import AuthenticationController from "@controllers/AuthenticationController";
import { Router } from "express";

const AuthenticationRouter = Router();

AuthenticationRouter.route("/").post(AuthenticationController.login);

AuthenticationRouter.route("/").get(AuthenticationController.recoverUserInfo);

export default AuthenticationRouter;
