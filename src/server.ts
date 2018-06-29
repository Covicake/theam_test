import * as express from 'express';

import * as passport from 'passport';
import { Strategy } from 'passport-http-bearer';

import { createConnection } from 'typeorm';
import { UserRepository } from './Repository/User-Repository';

import * as userRouter from './api/user';
import * as customerRouter from './api/customer';
import { login } from './controller';

createConnection().then(connection => {  // Establish conection between typeORM and database using the ormconfig.json file.
}).catch(error => console.log(error));

const userRepo = new UserRepository();

const app = express();
app.use(express.json());

passport.use(new Strategy((token, cb) => {
    userRepo.findUserByToken(token).then((user) => {
      cb(undefined, user);
    }).catch(err => cb(err));
  }));

app.post('/login', (req, res, next) => {
    login(req.body).then((response) => res.send(response)).catch((err) => res.send(err));
});

app.use('/user', passport.authenticate('bearer', { session: false }), userRouter);
app.use('/customer', passport.authenticate('bearer', { session: false}), customerRouter);

app.listen(3000, () => {
    console.log('Ready on port 3000!');
});