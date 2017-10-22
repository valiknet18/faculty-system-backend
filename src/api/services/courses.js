import db from '../../config/db';
import Course from '../models/course';

export const getCoursesService = async (user) => {
    const query = `
        SELECT s_g.id, g.name as group, s.name as subject, CONCAT(t.last_name, ' ', t.first_name) as teacher
        FROM subject_group as s_g
        JOIN groups as g ON g.id = s_g.group_id
        JOIN subjects as s ON s.id = s_g.subject_id
        JOIN users as t on t.id = s_g.teacher_id
        WHERE s_g.group_id = $1
    `;

    const result = await db.query(query, [
        user.groupId
    ]);

    return result.rows;
};


export const getCourseService = async (attributes) => {
    const query = `
        SELECT s_g.id,   
        FROM subject_group as s_g
        JOIN groups as g ON g.id = s_g.group_id
        JOIN users as u ON u.id = s_g.teacher_id 
        WHERE s_g.id = $1
    `;

    const result = await db.query(query, [
        attributes['courses']
    ]);

    if (!result.rows.length) {
        return null;
    }

    return Course.fromArray(result.rows[0]);
};

export const updateTaskService = async (parameters) => {
    const query = `
        UPDATE subject_group_task SET status=:status WHERE id=:task
    `;

    await db.query(query, [
        parameters['status'],
        parameters['task']
    ])
};

export const getCourseTasks = async (parameters) => {
    let tasks = [];

    return tasks;
};

export const getUserTasks = async (parameters, user) => {
    let tasks = [];

    return tasks;
};
