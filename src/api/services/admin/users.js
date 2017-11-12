import db from '../../../config/db';
import TokenGenerator from 'uuid-token-generator';

export const inviteUserService = async (parameters) => {
    const query = `
        INSERT INTO invited_users(
            email, token, invited_at, role
        )
        VALUES ($1, $2, $3, $4)
    `;

    await db.query(query, [
        parameters['email'],
        new TokenGenerator(256, TokenGenerator.BASE62).generate(),
        new Date(),
        parameters['role']
    ]);
};

export const getUsersListService = async () => {
    const query = `
        SELECT * FROM users
    `;

    const result = await db.query(query);

    return result.rows;
};

export const getTeachersService = async () => {
    const query = `
        SELECT * FROM users WHERE role='teacher'
    `;

    const result = await db.query(query);

    return result.rows;
};

export const getUserByToken = async (token) => {
    const query = `
        SELECT * FROM invited_users WHERE token=$1
    `;

    const result = await db.query(query, [
        token
    ]);

    if (!result.rows.length) {
        return false;
    }

    return result.rows[0];
};

export const editUserService = async (attributes) => {
    const query = `
        UPDATE users SET email=$2, role=$3, first_name=$4, last_name=$5, middle_name=$6 WHERE id=$1
    `;

    const result = await db.query(query, [
        attributes.user,
        attributes.email,
        attributes.role,
        attributes.first_name,
        attributes.last_name,
        attributes.middle_name,
    ]);
};

export const getUserService = async (attributes) => {
    const query = `
        SELECT * FROM users WHERE id=$1
    `;

    const result = await db.query(query, [
        attributes.user
    ]);

    if (!result.rows.length) {
        return false;
    }

    return result.rows[0];
};
