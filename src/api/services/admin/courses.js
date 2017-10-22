import db from '../../../config/db';
import User from "../../models/user";

export const createCourseService = async (attributes) => {
    const query = `
        INSERT INTO subject_group(subject_id, group_id, teacher_id, learning_semester_id) 
        VALUES($1, $2, $3, $4)
    `;

    await db.query(query, [
        attributes['subject'],
        attributes['group'],
        attributes['teacher'],
        attributes['learning_semester']
    ]);

    const tasks = await getAllSubjectTasks(attributes['subject']);
    const students = await getGroupStudents(attributes['group']);

    for (let user of students) {
        await assignTasksToStudent(tasks, user)
    }
};

const getGroupStudents = async (group) => {
    const query = `
        SELECT * FROM users WHERE group_id = :group
    `;

    const result = await db.query(query, [
        group
    ]);

    if (!result.rows.length) {
        return [];
    }

    let users = [];

    for (let userAttributes of result.rows) {
        let user = User.fromArray(userAttributes);

        users.push(user)
    }

    return users;
};

const getAllSubjectTasks = async (subject) => {
    const query = `
        SELECT * 
        FROM tasks
        JOIN themes ON themes.id = tasks.theme_id
        WHERE tasks.subject_id = :subject
    `;

    await db.query(query, [
        subject
    ]);
};

const assignTasksToStudent = async (tasks, student) => {
    const query = `
        INSERT INTO subject_group_task(task_id, student_id, subject_group_id, status, rating, created_at, updated_at, deadline_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;

    for (let task of tasks) {
        await db.query(query, task);
    }
};
