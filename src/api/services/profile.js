import db from '../../config/db';

export const getEventsService = async (user) => {
    const query = `
        SELECT s_g_t.id, t.title, s_g_t.deadline_date
        FROM subject_group_task as s_g_t
        JOIN tasks as t ON t.id = s_g_t.task_id
        WHERE s_g_t.student_id = $1
    `;

    const result = await db.query(query, [
        user.getId()
    ]);

    return result.rows;
};
