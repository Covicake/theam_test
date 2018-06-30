import * as express from 'express';
import { getUsersList } from './controller';

const userRouter = express.Router();

userRouter.get('/', (req, res, next) => {
   if (req.user.isAdmin) {
        getUsersList().then((response) => res.send(response)).catch((err) => res.send(err));
   }
});




export = userRouter;