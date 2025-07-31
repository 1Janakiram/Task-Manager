import {Router} from 'express';
import authorize from '../middlewares/auth.middileware.js';
import { getUsers, getUser, updateUser } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/',authorize,getUsers);

userRouter .get('/:id',authorize ,getUser);

userRouter.put('/:id',authorize, updateUser);


export default userRouter;