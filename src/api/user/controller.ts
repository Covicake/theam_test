import { UserRepository } from '../../Repository/User-Repository';
import * as bcrypt from 'bcrypt';
import { User } from '../../Entity/User';

const userRepo = new UserRepository();

export function hashPass(password) {
    return bcrypt.hash(password, 10);
}

export function createUser(userData) {
    return new Promise((resolve, reject) => {
        if (typeof(userData.isAdmin) !== typeof(true)) {
            reject('isAdmin must be boolean');
        }
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
        if (typeof(userData.isAdmin) !== typeof(true)) {
            reject('isAdmin must be boolean');
        }
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

export function setPrivileges(userId, newValue: User) {
    return new Promise((resolve, reject) => {
        if (typeof(newValue.isAdmin) !== typeof(true)) {
            reject('Input data must be boolean');
        } else {
            userRepo.findUserById(userId).then((queryResult) => {
                queryResult.isAdmin = newValue.isAdmin;
                userRepo.updateUserData(userId, queryResult).then((response) => {
                    resolve(response);
                }).catch((err) => reject(err));
            }).catch((err) => reject(err));
        }
    });
}