import * as express from 'express';
import { getCustomers } from './controller';

const customerRouter = express.Router();

customerRouter.get('/', (req, res, next) => {
   res.send(getCustomers());
});

export = customerRouter;