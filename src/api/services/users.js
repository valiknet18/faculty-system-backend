import db from '../../config/db';

export const getUsersService = async () => {
    const client = await db.connect();

    const query = `SELECT * FROM users`;
    const result = await client.query(query);

    client.release();

    return result.rows;
}
