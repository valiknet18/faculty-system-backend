import db from '../../common/connection/db';
import User from "../../common/models/user";
import NotFoundError from "../../common/exceptions/not_found_error";
import InvitedUser from "../../common/models/invited_user";
import moment from "moment";

class UserRepository {
    constructor(db) {
        this._db = db;
    }

    /**
     * Get user parameters by email
     * @param {string} email
     * @return {Promise.<User>}
     */
    async getUserByEmail(email) {
        const query = `
            SELECT id, first_name, last_name, email, role, is_admin, group_id
            FROM users 
            WHERE email=$1 
            LIMIT 1
        `;

        const result = await this._db.query(query, [email]);

        if (!result.rows.length) {
            throw new NotFoundError();
        }

        return User.fromArray(result.rows[0]);
    }

    /**
     * Get user password
     * @param {User} user
     * @return {Promise.<string>}
     */
    async getUserPasswordById(user) {
        const query = `SELECT password FROM users WHERE id=$1`;

        const result = await this._db.query(query, [user.id]);

        if (!result.rows.length) {
            throw new NotFoundError();
        }

        return result.rows[0].password;
    }

    /**
     * Get user from invited users by token
     * @param token
     * @return {Promise.<InvitedUser>}
     */
    async getUserByToken(token) {
        const query = `
            SELECT * FROM invited_users WHERE token=$1
        `;

        const result = await this._db.query(query, [
            token
        ]);

        if (!result.rows.length) {
            throw new NotFoundError();
        }

        return InvitedUser.fromArray(result.rows[0]);
    }

    /**
     * Create new user
     * @param {User} user
     * @param {string} passwordHash
     * @return {Promise.<User>}
     */
    async createUser(user, passwordHash) {
        const query = `
            INSERT INTO users(
                first_name, last_name, middle_name, role, 
                password, is_admin, science_degree, 
                email, phone, registered_at, group_id
            ) 
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING id
        `;

        const result = await db.query(query, [
            user.firstName,
            user.lastName,
            user.middleName,
            user.role,
            passwordHash,
            user.isAdmin,
            user.scienceDegree,
            user.email,
            user.phone,
            moment().format(),
            user.groupId,
        ]);

        user.setId(result.rows[0].id);

        return user;
    }
}

export default new UserRepository(db);
