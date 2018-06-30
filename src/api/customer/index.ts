import * as express from 'express';
import * as fileUpload from 'express-fileupload';

import { createCustomer, getCustomersList, getCustomer, updateCustomerData, deleteCustomer } from './controller';

const customerRouter = express.Router();
customerRouter.use(fileUpload());

customerRouter.post('/', (req, res, next) => {
    createCustomer(req.user.userName, req.body, req.files).then((response) => res.send(response)).catch((err) => res.send(err));
});

 customerRouter.get('/', (req, res, next) => {
    console.log(req.user);
    getCustomersList().then((response) => res.send(response)).catch((err) => res.send(err));
 });

customerRouter.get('/:id', (req, res, next) => {
    getCustomer(req.params.id).then((response) => res.send(response)).catch((err) => res.send(err));
 });

customerRouter.put('/:id', (req, res, next) => {
    updateCustomerData(req.user.userName, req.params.id, req.body, req.files).then((response) => res.send(response)).catch((err) => res.send(err));
});

customerRouter.delete('/:id', (req, res, next) => {
    deleteCustomer(req.params.id).then((response) => res.send(response)).catch((err) => res.send(err));
});

 export = customerRouter;