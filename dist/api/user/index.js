"use strict";
const express = require("express");
const controller_1 = require("./controller");
const User_Repository_1 = require("../../Repository/User-Repository");
const userRouter = express.Router();
const userRepo = new User_Repository_1.UserRepository();
userRouter.use((req, res, next) => {
    userRepo.findUserByUsername(req.user.userName).then(() => next()).catch((err) => res.send('Invalid token'));
});
userRouter.post('/', (req, res, next) => {
    if (req.user.isAdmin) {
        controller_1.createUser(req.body).then((response) => res.send(response)).catch((err) => res.send(err));
    }
    else {
        res.send(401);
    }
});
userRouter.get('/', (req, res, next) => {
    if (req.user.isAdmin) {
        controller_1.getUsersList().then((response) => res.send(response)).catch((err) => res.send(err));
    }
    else {
        res.send(401);
    }
});
userRouter.get('/:id', (req, res, next) => {
    if (req.user.isAdmin) {
        controller_1.getUser(req.params.id).then((response) => res.send(response)).catch((err) => res.send(err));
    }
    else {
        res.send(401);
    }
});
userRouter.put('/:id', (req, res, next) => {
    if (req.user.isAdmin) {
        controller_1.updateUser(req.params.id, req.body).then((response) => res.send(response)).catch((err) => res.send(err));
    }
    else {
        res.send(401);
    }
});
userRouter.delete('/:id', (req, res, next) => {
    if (req.user.isAdmin) {
        controller_1.deleteUser(req.params.id).then((response) => res.send(response)).catch((err) => res.send(err));
    }
    else {
        res.send(401);
    }
});
userRouter.post('/:id', (req, res, next) => {
    if (req.user.isAdmin) {
        controller_1.setPrivileges(req.params.id, req.body).then(() => res.send(200)).catch((err) => res.send(err));
    }
    else {
        res.send(401);
    }
});
module.exports = userRouter;
//# sourceMappingURL=index.js.map