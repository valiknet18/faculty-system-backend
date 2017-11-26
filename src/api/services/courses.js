import db from '../../common/connection/db';
import Course from '../models/course';

export const getTaskService = async (attributes) => {
    const query = `
        SELECT s_g_t.id, t.title, t.content, s_g_t.status, CONCAT(u.last_name, ' ', u.first_name) as fullName 
        FROM subject_group_task as s_g_t
        JOIN tasks as t ON t.id = s_g_t.task_id
        JOIN users as u ON u.id = s_g_t.student_id
        WHERE s_g_t.id = $1
    `;

    const result = await db.query(query, [
        attributes.task
    ]);

    if (!result.rows.length) {
        return false;
    }

    return result.rows[0];
};

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

export const moveTaskService = async (parameters) => {
    const query = `
        UPDATE subject_group_task SET status=$1 WHERE id=$2
    `;

    await db.query(query, [
        parameters['status'],
        parameters['task']
    ])
};

export const getCourseTasks = async (attributes) => {
    const query = `
        SELECT * FROM subject_group_task WHERE subject_group_id = $1
    `;

    const result = await db.query(query, [
        attributes.course
    ]);

    return _groupTasksByStatus(result.rows);
};

export const getUserTasks = async (attributes, user) => {
    const query = `
        SELECT s_g_t.id, s_g_t.status, t.title, t.content, CONCAT(u.last_name, ' ', u.first_name) as fullName
        FROM subject_group_task as s_g_t
        JOIN tasks as t ON t.id = s_g_t.task_id
        JOIN users as u ON u.id = s_g_t.student_id
        WHERE s_g_t.subject_group_id = $1 AND s_g_t.student_id = $2
    `;

    const result = await db.query(query, [
        attributes.course,
        user.id
    ]);

    return _groupTasksByStatus(result.rows);
};

const _groupTasksByStatus = (tasks) => {
    let groupedTasks = {};

    for (let task of tasks) {
        if (!(task.status in groupedTasks)) {
            groupedTasks[task.status] = [];
        }

        groupedTasks[task.status].push(task);
    }

    return groupedTasks;
};
