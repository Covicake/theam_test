"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("../Entity/User");
class UserRepository {
    findUserByUsername(userName) {
        return typeorm_1.getManager().getRepository(User_1.User).findOne({
            userName
        });
    }
    createUser(user) {
        return typeorm_1.getManager().getRepository(User_1.User).save(user);
    }
    getUsersList() {
        return typeorm_1.getManager().getRepository(User_1.User).find();
    }
    findUserById(userId) {
        return typeorm_1.getManager().getRepository(User_1.User).findOne({ id: userId });
    }
    updateUserData(userId, userData) {
        return typeorm_1.getManager().getRepository(User_1.User).update({ id: userId }, userData);
    }
    deleteUser(userId) {
        return typeorm_1.getManager().getRepository(User_1.User).delete(userId);
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=User-Repository.js.map