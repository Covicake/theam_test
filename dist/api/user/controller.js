"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_Repository_1 = require("../../Repository/User-Repository");
const bcrypt = require("bcrypt");
const config = require('../../../config');
const userRepo = new User_Repository_1.UserRepository();
function hashPass(password) {
    return bcrypt.hash(password, 10);
}
exports.hashPass = hashPass;
function createUser(userData) {
    return new Promise((resolve, reject) => {
        if (typeof (userData.isAdmin) !== typeof (true)) {
            reject('isAdmin must be boolean');
        }
        hashPass(userData.password).then((hashed) => {
            userData.password = hashed;
            userRepo.createUser(userData).then((queryResult) => resolve(queryResult)).catch((err) => reject(err));
        }).catch((err) => console.log(err));
    });
}
exports.createUser = createUser;
function getUsersList() {
    return new Promise((resolve, reject) => {
        userRepo.getUsersList().then((queryResult) => resolve(queryResult)).catch((err) => reject(err));
    });
}
exports.getUsersList = getUsersList;
function getUser(userId) {
    return new Promise((resolve, reject) => {
        userRepo.findUserById(userId).then((queryResult) => resolve(queryResult)).catch((err) => reject(err));
    });
}
exports.getUser = getUser;
function updateUser(userId, userData) {
    return new Promise((resolve, reject) => {
        if (typeof (userData.isAdmin) !== typeof (true)) {
            reject('isAdmin must be boolean');
        }
        userRepo.findUserById(userId).then((queryResult) => {
            hashPass(userData.password).then((hashed) => {
                userData.password = hashed;
                queryResult = Object.assign({}, userData);
                userRepo.updateUserData(userId, queryResult).then(() => resolve(200)).catch((err) => reject(err));
                queryResult = Object.assign({}, userData);
            }).catch((err) => reject(err));
        }).catch((err) => reject(err));
    });
}
exports.updateUser = updateUser;
function deleteUser(userId) {
    return new Promise((resolve, reject) => {
        userRepo.deleteUser(userId).then(() => resolve(200)).catch((err) => reject(err));
    });
}
exports.deleteUser = deleteUser;
function setPrivileges(userId, newValue) {
    return new Promise((resolve, reject) => {
        if (typeof (newValue.isAdmin) !== typeof (true)) {
            reject('Input data must be boolean');
        }
        else {
            userRepo.findUserById(userId).then((queryResult) => {
                queryResult.isAdmin = newValue.isAdmin;
                userRepo.updateUserData(userId, queryResult).then((response) => {
                    resolve(response);
                }).catch((err) => reject(err));
            }).catch((err) => reject(err));
        }
    });
}
exports.setPrivileges = setPrivileges;
//# sourceMappingURL=controller.js.map