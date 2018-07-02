import * as express from 'express';
import { createUser, getUsersList, getUser, updateUser, deleteUser, setPrivileges } from './controller';
import { UserRepository } from '../../Repository/User-Repository';

const userRouter = express.Router();
const userRepo = new UserRepository();

userRouter.use((req, res, next) => {
    userRepo.findUserByUsername(req.user.userName).then(() => next()).catch((err) => res.send('Invalid token'));
});

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

userRouter.post('/:id', (req, res, next) => {
    if (req.user.isAdmin) {
        setPrivileges(req.params.id, req.body).then(() => res.send(200)).catch((err) => res.send(err));
    } else {
        res.send(401);
    }
});



export = userRouter;