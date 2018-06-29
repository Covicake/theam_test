import { UserRepository } from './Repository/User-Repository';
import { v1 as uuid } from 'uuid';

const userRepo = new UserRepository();

export function login(body) {
    console.log(body);
    return new Promise((resolve, reject) => {
        userRepo.login(body.user, body.pass).then((queryResult) => {
            const newAuthToken = uuid();
            queryResult.token = newAuthToken;
            userRepo.updateUserToken(queryResult).then(() => resolve(newAuthToken));
        }).catch((err) => reject(err));
    });
}