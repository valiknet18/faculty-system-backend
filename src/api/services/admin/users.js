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
        new TokenGenerator(256, TokenGenerator.BASE62).baseEncoding,
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
