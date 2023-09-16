import { Router } from 'express';
import { UserController } from '../controllers';

const userRouter = Router();

userRouter.route('/card/')
  .post(
    UserController.create,
  );

userRouter.route('/card/:userId')
  .get(
    UserController.read,
  );

export default userRouter;
