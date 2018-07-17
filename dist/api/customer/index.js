"use strict";
const express = require("express");
const fileUpload = require("express-fileupload");
const controller_1 = require("./controller");
const customerRouter = express.Router();
customerRouter.use(fileUpload({ safeFileNames: true }));
customerRouter.post('/', (req, res, next) => {
    controller_1.createCustomer(req.user.userName, req.body, req.files).then((response) => res.send(response)).catch((err) => res.send(err));
});
customerRouter.get('/', (req, res, next) => {
    controller_1.getCustomersList().then((response) => res.send(response)).catch((err) => res.send(err));
});
customerRouter.get('/:id', (req, res, next) => {
    controller_1.getCustomer(req.params.id).then((response) => res.send(response)).catch((err) => res.send(err));
});
customerRouter.put('/:id', (req, res, next) => {
    controller_1.updateCustomerData(req.user.userName, req.params.id, req.body, req.files).then((response) => res.send(response)).catch((err) => res.send(err));
});
customerRouter.delete('/:id', (req, res, next) => {
    controller_1.deleteCustomer(req.params.id).then((response) => res.send(response)).catch((err) => res.send(err));
});
module.exports = customerRouter;
//# sourceMappingURL=index.js.map