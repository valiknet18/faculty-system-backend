import db from '../../config/db';

export const getUsersService = async () => {
    // const client = await db.connect();

    const query = `SELECT * FROM users`;
    const result = await db.query(query);

    client.release();

    return result.rows;
};

export const getStudentsListService = async () => {
    const query = `
        SELECT * FROM users WHERE role='student'
    `;

    const result = await db.query(query);

    return result.rows;
};
