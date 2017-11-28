import db from '../../common/connection/db';
import Collection from '../../common/utils/collection';
import User from '../../common/models/user';
import NotFoundError from "../../common/exceptions/not_found_error";
import TokenGenerator from "uuid-token-generator";

class UsersRepository {
    constructor(db) {
        this._db = db;
    }

    /**
     * Get users
     * @return {Promise.<Array>}
     */
    async getUsers() {
        const query = `
            SELECT * FROM users
        `;

        const result = await this._db.query(query);

        return Collection.convert(User, result.rows);
    }

    /**
     * Get teachers
     * @return {Promise.<Array>}
     */
    async getTeachers() {
        const query = `
            SELECT * FROM users WHERE role='teacher'
        `;

        const result = await db.query(query);

        return Collection.convert(User, result.rows);
    }

    /**
     * Get user
     * @param {int} user
     * @return {Promise.<*>}
     */
    async getUser(user) {
        const query = `
            SELECT * FROM users WHERE id=$1
        `;

        const result = await db.query(query, [user]);

        if (!result.rows.length) {
            throw new NotFoundError();
        }

        return User.fromArray(result.rows[0]);
    }

    /**
     * Invite user to system
     * @param {Object} invitedUser
     * @return {Promise.<void>}
     */
    async inviteUser(invitedUser) {
        const query = `
            INSERT INTO invited_users(
                email, token, invited_at, role
            )
            VALUES ($1, $2, $3, $4)
        `;

        await db.query(query, [
            invitedUser.email,
            new TokenGenerator(256, TokenGenerator.BASE62).generate(),
            new Date(),
            invitedUser.role,
        ]);
    }

    /**
     * Update user
     * @param {User} user
     * @return {Promise.<User>}
     */
    async updateUser(user) {
        const query = `
            UPDATE users SET email=$2, role=$3, first_name=$4, last_name=$5, middle_name=$6 WHERE id=$1
        `;

        await db.query(query, [
            user.id,
            user.email,
            user.role,
            user.firstName,
            user.lastName,
            user.middleName,
        ]);

        return user
    }
}

export default new UsersRepository(db);
