import * as express from 'express';
// import { getCustomers } from './controller';

const userRouter = express.Router();

userRouter.get('/', (req, res, next) => {
   res.send('Hello, user!');
});


export = userRouter;