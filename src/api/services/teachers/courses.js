import db from '../../../common/connection/db';

export const getSubjectsListService = async (userId) => {
    const query = `
        SELECT s_g.id,   
        FROM subject_group as s_g
        JOIN groups as g ON g.id = s_g.group_id
        JOIN users as u ON u.id = s_g.teacher_id 
        WHERE s_g.teacher_id = $1
    `;

    const result = await db.query(query, [userId]);

    return result.rows
};
