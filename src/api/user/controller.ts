import { UserRepository } from '../../Repository/User-Repository';
import * as bcrypt from 'bcrypt';
const config = require('../../../config');

const userRepo = new UserRepository();

function hashPass(password) {
    return bcrypt.hash(password, 10);
}

export function createUser(userData) {
    return new Promise((resolve, reject) => {
        hashPass(userData.password).then((hashed) => {
            userData.password = hashed;
            userRepo.createUser(userData).then((queryResult) => resolve(queryResult)).catch((err) => reject(err));
        }).catch((err) => console.log(err));
    });
}

export function getUsersList() {
    return new Promise((resolve, reject) => {
        userRepo.getUsersList().then((queryResult) => resolve(queryResult)).catch((err) => reject(err));
    });
}

export function getUser(userId: number) {
    return new Promise((resolve, reject) => {
        userRepo.findUserById(userId).then((queryResult) => resolve(queryResult)).catch((err) => reject(err));
    });
}

export function updateUser(userId: number, userData) {
    return new Promise((resolve, reject) => {
        userRepo.findUserById(userId).then((queryResult) => {
            hashPass(userData.password).then((hashed) => {
                userData.password = hashed;
                queryResult = {...userData};
                userRepo.updateUserData(userId, queryResult).then(() => resolve(200)).catch((err) => reject(err));
                queryResult = {...userData};
            }).catch((err) => reject(err));
        }).catch((err) => reject(err));
    });
}

export function deleteUser(userId: number) {
    return new Promise((resolve, reject) => {
        userRepo.deleteUser(userId).then(() => resolve(200)).catch((err) => reject(err));
    });
}

export function setPrivileges(userId, newValue: boolean) {
    return new Promise((resolve, reject) => {
        userRepo.findUserById(userId).then((queryResult) => {
            queryResult.isAdmin = newValue;
            userRepo.updateUserData(userId, queryResult).then(() => resolve(200)).catch((err) => reject(err));
        }).catch((err) => reject(err));
    });
}