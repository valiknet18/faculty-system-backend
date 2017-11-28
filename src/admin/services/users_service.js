import usersRepository from '../repositories/users_repository';
import User from "../../common/models/user";

class UsersService {
    /**
     * @param {UsersRepository} usersRepository
     */
    constructor(usersRepository) {
        this._usersRepository = usersRepository;
    }

    /**
     * Get users
     * @return {Promise.<Array>}
     */
    async getUsers() {
        return await this._usersRepository.getUsers();
    }

    /**
     * Get teachers
     * @return {Promise.<Array>}
     */
    async getTeachers() {
        return await this._usersRepository.getTeachers();
    }

    /**
     * Get user
     * @param user
     * @return {Promise.<*>}
     */
    async getUser(user) {
        return await this._usersRepository.getUser(user);
    }

    /**
     * Invite user to system
     * @param attributes
     * @return {Promise.<void>}
     */
    async inviteUser(attributes) {
        return await this._usersRepository.inviteUser(attributes);
    }

    /**
     * Update user
     * @param {Object} attributes
     * @return {Promise.<User>}
     */
    async updateUser(attributes) {
        return await this._usersRepository.updateUser(
            User.fromArray(attributes)
        );
    }
}

export default new UsersService(usersRepository);
