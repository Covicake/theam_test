import { getManager, UpdateResult, DeleteResult } from 'typeorm';
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

    createUser(user: User): Promise<User> {
        return getManager().getRepository(User).save(user);
    }

    getUsersList(): Promise<User[]> {
        return getManager().getRepository(User).find();
    }

    findUserById(userId: number): Promise<User> {
        return getManager().getRepository(User).findOne({id: userId});
    }

    updateUserData(userId: number, userData: User): Promise<UpdateResult> {
        return getManager().getRepository(User).update({id: userId}, userData);
    }

    deleteUser(userId: number): Promise<DeleteResult> {
        return getManager().getRepository(User).delete(userId);
    }
}