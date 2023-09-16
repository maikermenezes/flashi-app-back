import { Router } from 'express';
import { UserController } from '../controllers';

const userRouter = Router();

userRouter.route('/')
  .post(
    UserController.create,
  );

userRouter.route('/:userId')
  .get(
    UserController.read,
  );

export default userRouter;
