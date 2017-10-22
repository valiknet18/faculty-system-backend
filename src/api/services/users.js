import db from '../../config/db';

export const getUsersService = async () => {
    const query = `SELECT * FROM users`;
    const result = await db.query(query);

    client.release();

    return result.rows;
};
