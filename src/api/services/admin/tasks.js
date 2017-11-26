import db from '../../../common/connection/db';

export const getTasksService = async (theme) => {
    const query = `
        SELECT * FROM tasks WHERE theme_id = $1
    `;

    const result = await db.query(query, [
        theme.theme
    ]);

    return result.rows;
};

export const createTaskService = async (attributes) => {
    const query = `
        INSERT INTO tasks(title, content, test_id, theme_id, created_at, updated_at) VALUES($1, $2, null, $3, NOW(), NOW())
    `;

    await db.query(query, [
        attributes.title,
        attributes.content,
        attributes.theme
    ]);
};
