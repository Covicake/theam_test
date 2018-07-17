"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_Repository_1 = require("./Repository/User-Repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require('../config');
const userRepo = new User_Repository_1.UserRepository();
const userData = []; // Holds the userName and admin condition of the user trying to log in.
function checkPassword(userName, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let comparisonResult;
        yield userRepo.findUserByUsername(userName).then((queryResult) => {
            userData.push(queryResult.userName);
            userData.push(queryResult.isAdmin);
            comparisonResult = bcrypt.compare(password, queryResult.password); // Compares if the password given by the client matches the one stored in the database after encryption.
        }).catch((err) => 'Incorrect username');
        return comparisonResult;
    });
}
function login(body) {
    return new Promise((resolve, reject) => {
        const results = checkPassword(body.userName, body.password);
        results.then((isValid) => {
            if (isValid !== true) {
                reject('Incorrect password');
            }
            else {
                const payload = {
                    userName: userData[0],
                    isAdmin: userData[1]
                };
                const token = jwt.sign(payload, config.secret, {
                    expiresIn: 120 * 60 // Two hours
                });
                resolve(token); // Sends the token back to the client.
            }
        }).catch(() => reject('Invalid password'));
    });
}
exports.login = login;
//# sourceMappingURL=controller.js.map