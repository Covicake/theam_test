"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const typeorm_1 = require("typeorm");
const userRouter = require("./api/user");
const customerRouter = require("./api/customer");
const controller_1 = require("./controller");
const expressJwt = require("express-jwt");
const config = require('../config');
const path = require("path");
const User_Repository_1 = require("./Repository/User-Repository");
const controller_2 = require("./api/user/controller");
const User_1 = require("./Entity/User");
typeorm_1.createConnection().then(connection => {
}).catch(error => console.log(error));
const app = express();
app.use(express.json()); // Tells express to parse the request as a json file.
const userRepo = new User_Repository_1.UserRepository();
const authenticate = expressJwt({ secret: config.secret }); // A function to check if a token is valid, if so decode it and return the underlying user data.
app.use('/static', authenticate, express.static(path.resolve(__dirname, 'images'))); // Static path to store the images, protected with authentication.
app.get('/', (req, res, next) => {
    userRepo.getUsersList().then((result) => {
        if (result.length === 0) {
            const newUser = new User_1.User();
            newUser.name = 'admin';
            newUser.lastName = 'admin';
            newUser.isAdmin = true;
            newUser.userName = 'admin';
            controller_2.hashPass('1').then((hashed) => {
                newUser.password = hashed;
                userRepo.createUser(newUser).then(() => next()).catch(() => next());
            });
        }
        else {
            next();
        }
    });
});
app.post('/login', (req, res, next) => {
    controller_1.login(req.body).then((response) => res.send(response)).catch((err) => res.send(err));
});
app.use('/user', authenticate, userRouter);
app.use('/customer', authenticate, customerRouter);
app.listen(3000, () => {
    console.log('Ready on port 3000!');
});
//# sourceMappingURL=server.js.map