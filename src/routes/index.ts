import { NextFunction, Request, Response, Router } from "express";
import routes from "./MailRoutes";
import UserRouter from "./UserRoutes";
import AuthenticationRouter from "./AuthenticationRouter";
import DeckRouter from "./DeckRoutes";
import CardRouter from "./CardRoutes";

const router = Router();

router.use("/user", UserRouter);
router.use("/deck", DeckRouter);
router.use("/card", CardRouter);
router.use("/email", routes);
router.use("/auth", AuthenticationRouter);
router.route("/").get((req, res) => {
  res.send("Made with 💚 and &lt; &#x0002F; &gt; by CITi");
});

export default router;
