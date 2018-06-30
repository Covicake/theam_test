import * as express from 'express';
import { createUser, getUsersList, getUser, updateUser, deleteUser } from './controller';

const userRouter = express.Router();

userRouter.post('/', (req, res, next) => {
    if (req.user.isAdmin) {
        createUser(req.body).then((response) => res.send(response)).catch((err) => res.send(err));
    } else {
        res.send(401);
    }
});

userRouter.get('/', (req, res, next) => {
   if (req.user.isAdmin) {
        getUsersList().then((response) => res.send(response)).catch((err) => res.send(err));
   } else {
       res.send(401);
   }
});

userRouter.get('/:id', (req, res, next) => {
    if (req.user.isAdmin) {
        getUser(req.params.id).then((response) => res.send(response)).catch((err) => res.send(err));
    } else {
        res.send(401);
    }
});

userRouter.put('/:id', (req, res, next) => {
    if (req.user.isAdmin) {
        updateUser(req.params.id, req.body).then((response) => res.send(response)).catch((err) => res.send(err));
    } else {
        res.send(401);
    }
});

userRouter.delete('/:id', (req, res, next) => {
    if (req.user.isAdmin) {
        deleteUser(req.params.id).then((response) => res.send(response)).catch((err) => res.send(err));
    } else {
        res.send(401);
    }
});



export = userRouter;