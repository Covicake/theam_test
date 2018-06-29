import { getManager, UpdateResult } from 'typeorm';
import { User } from '../Entity/User';

export class UserRepository {

    login(user: string, password: string): Promise<User> {
        return getManager().getRepository(User).findOne({
            where: {
                userName: user,
                password
            }
        });
    }

    findUserByToken(token: string): Promise<User> {
        return getManager().getRepository(User).findOne({
            token
        });
    }

    updateUserToken(user: User): Promise<UpdateResult> {
        return getManager().getRepository(User).update({id: user.id}, user);
    }
}