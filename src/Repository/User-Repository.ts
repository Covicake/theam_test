import { getManager, UpdateResult, DeleteResult } from 'typeorm';
import { User } from '../Entity/User';

export class UserRepository {

    findUserByUsername(userName: string): Promise<User> {
        return getManager().getRepository(User).findOne({
            userName
        });
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