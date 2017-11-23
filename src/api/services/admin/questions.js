import db from '../../../config/db';

export const getQuestionsService = async (attributes) => {
    const query = `
        SELECT * FROM questions WHERE test_id=$1
    `;

    const result = await db.query(query, [
        attributes.test
    ]);

    return result.rows;
};

export const createQuestionService = async (attributes) => {
    const query = `
        INSERT INTO questions(title, content, type, test_id, created_at, updated_at) 
        WHERE ($1, $2, $3, $4, NOW(), NOW())
    `;

    await db.query(query, [
        attributes.title,
        attributes.content,
        attributes.type,
        attributes.test
    ]);
};
