import * as express from 'express';

import { createConnection } from 'typeorm';

import * as userRouter from './api/user';
import * as customerRouter from './api/customer';

import { login } from './controller';

import * as jwt from 'jsonwebtoken';
import * as expressJwt from 'express-jwt';
const config = require('./config');

import * as path from 'path';
import { UserRepository } from './Repository/User-Repository';
import { User } from './Entity/User';
import { hashPass } from './api/user/controller';


createConnection().then(connection => {  // Establish conection between typeORM and database using the ormconfig.json file.
}).catch(error => console.log(error));

const userRepo = new UserRepository();

const app = express();
app.use(express.json());  // Tells express to parse the request as a json file.

const authenticate = expressJwt({secret : config.secret});  // A function to check if a token is valid, if so decode it and return the underlying user data.

app.get('/', (req, res, next) => {
    userRepo.getUsersList().then((result) => {
        if (result.length == 0) {
            const newUser = new User();
            newUser.name = 'admin';
            newUser.lastName = 'admin';
            newUser.isAdmin = true;
            newUser.userName = 'admin';
            hashPass('1').then((hashed) => {
                newUser.password = hashed;
                userRepo.createUser(newUser).then(() => next()).catch(() => next());
            });
        } else { next(); }
    });
});

app.use('/static', authenticate, express.static(path.resolve(__dirname, 'images'))); // Static path to store the images, protected with authentication.

app.post('/login', (req, res, next) => {
    login(req.body).then((response) => res.send(response)).catch((err) => res.status(401).send('Wrong username or password'));
});

app.use('/user', authenticate, userRouter);
app.use('/customer', authenticate, customerRouter);

app.listen(3000, () => {
    console.log('Ready on port 3000!');
});