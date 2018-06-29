import * as express from 'express';
import * as fileUpload from 'express-fileupload';

import { createCustomer, getCustomersList, getCustomer } from './controller';

 const customerRouter = express.Router();
customerRouter.use(fileUpload());

customerRouter.post('/', (req, res, next) => {
    createCustomer(req.body, req.files).then((response) => res.send(response)).catch((err) => res.send(err));
});

 customerRouter.get('/', (req, res, next) => {
   getCustomersList().then((response) => res.send(response)).catch((err) => res.send(err));
 });

customerRouter.get('/:id', (req, res, next) => {
    getCustomer(req.params.id).then((response) => res.send(response)).catch((err) => res.send(err));
 });

 export = customerRouter;