import { UserRepository } from '../../Repository/User-Repository';

const userRepo = new UserRepository();

export function createUser(userdata) {
    return new Promise((resolve, reject) => {
        userRepo.createUser(userdata).then((queryResult) => resolve(queryResult)).catch((err) => reject(err));
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
            queryResult = {...userData};
            userRepo.updateUserData(userId, queryResult).then(() => resolve(200)).catch((err) => reject(err));
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