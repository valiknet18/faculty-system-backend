import userRepository from '../repositories/user_repository';
import UserPasswordNotCorrectError from '../exceptions/user_password_not_correct_error';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../../common/models/user";

class AuthService {
    /**
     * @param {UserRepository} userRepository
     * @param bcrypt
     * @param jwt
     */
    constructor(userRepository, bcrypt, jwt) {
        this._userRepository = userRepository;
        this._bcrypt = bcrypt;
        this._jwt = jwt;
    }

    /**
     * Login method
     * @param {string} email
     * @param {string} password
     * @return {Promise.<User>}
     */
    async getUserByEmailAndPassword(email, password) {
        const user = await this._userRepository.getUserByEmail(email);
        const passwordFromDatabase = await this._userRepository.getUserPasswordById(user);

        const result = await this._bcrypt.compare(password, passwordFromDatabase);

        if (!result) {
            throw new UserPasswordNotCorrectError();
        }

        return user;
    }

    /**
     * Get invitedUser by token
     * @param token
     * @return {Promise.<InvitedUser>}
     */
    async getUserByToken(token) {
        return await this._userRepository.getUserByToken(token);
    }

    /**
     * Registration
     * @param attributes
     * @return {Promise.<User>}
     */
    async registration(attributes) {
        const salt = await this._bcrypt.genSaltSync(
            parseInt(process.env.APP_ROUNDS)
        );
        const passwordHash = await self._bcrypt.hash(
            attributes.password,
            salt
        );

        return await this._userRepository.createUser(
            User.fromArray(attributes),
            passwordHash
        );
    }

    /**
     * Get user token
     * @param {User} user
     */
    getToken(user) {
        const restrictedUser = {
            id: user.id,
            first_name: user.firstName,
            last_name: user.lastName,
            middle_name: user.middleName,
            email: user.email,
        };

        return this._jwt.sign(
            restrictedUser,
            process.env.APP_SECRET
        );
    }
}

export default new AuthService(userRepository, bcrypt, jwt);
