import { UserRepository } from '../../Repository/User-Repository';
import { v1 as uuid } from 'uuid';

const userRepo = new UserRepository();

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