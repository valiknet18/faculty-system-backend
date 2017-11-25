import db from '../../../config/db';

export const getTestsService = async (attributes) => {
    const query = `
        SELECT * FROM tests WHERE subject_id=$1
    `;

    const result = await db.query(query, [
        attributes.subject
    ]);

    return result.rows;
};

export const createTestService = async (attributes) => {
    const query = `
        INSERT INTO tests(title, subject_id, created_at, updated_at) VALUES($1, $2, NOW(), NOW())
    `;

    await db.query(query, [
        attributes.title,
        attributes.subject
    ])
};
