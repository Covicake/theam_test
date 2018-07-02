import { UserRepository } from './Repository/User-Repository';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

const config = require('../config');

const userRepo = new UserRepository();

const userData = [];  // Holds the userName and admin condition of the user trying to log in.

async function checkPassword(userName, password) {
    let comparisonResult;
    await userRepo.findUserByUsername(userName).then((queryResult) => {
        userData.push(queryResult.userName);
        userData.push(queryResult.isAdmin);

        comparisonResult = bcrypt.compare(password, queryResult.password);  // Compares if the password given by the client matches the one stored in the database after encryption.
    }).catch((err) => 'Incorrect username');
    return comparisonResult;
}

export function login(body) {
    return new Promise((resolve, reject) => {
        const results = checkPassword(body.userName, body.password);
        results.then((isValid) => {
            if (isValid !== true) {
                reject('Incorrect password');
            } else {

                const payload = {  // Sets the information that needs to be included within the token.
                    userName: userData[0],
                    isAdmin: userData[1]
                };
                const token = jwt.sign(payload, config.secret, {
                    expiresIn: 120 * 60  // Two hours
                });
                resolve(token);  // Sends the token back to the client.
            }
        }).catch(() => reject('Invalid password'));
    });
}