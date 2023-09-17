import { NextFunction, Request, Response, Router } from "express";
import routes from "./MailRoutes";
import UserRouter from "./UserRoutes";
import { login, recoverUserInfo } from "src/authentication";

const router = Router();

router.use("/user", UserRouter);
router.use("/email", routes);
router.route("/").get((req, res) => {
  res.send("Made with 💚 and &lt; &#x0002F; &gt; by CITi");
});

router.route("/login").post(login);
router.route("/recoverUserInfo").post(recoverUserInfo);

export default router;
