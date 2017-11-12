import db from '../../../config/db';
import User from "../../models/user";

export const getCoursesService = async () => {
    const query = `
        SELECT s.name as subject_name, (CONCAT(t.last_name, ' ', first_name)) as teacher_fullname, g.name as group_name, c.id as course_id
        FROM subject_group as c
        JOIN users as t ON t.id = c.teacher_id
        JOIN groups as g ON g.id = c.group_id
        JOIN subjects as s ON s.id = c.subject_id
    `;

    const result = await db.query(query);

    return result.rows;
};

export const createCourseService = async (attributes) => {
    const query = `
        INSERT INTO subject_group(subject_id, group_id, teacher_id, learning_semester_id, created_at, updated_at) 
        VALUES($1, $2, $3, $4, NOW(), NOW()) RETURNING id
    `;

    const result = await db.query(query, [
        attributes['subject'],
        attributes['group'],
        attributes['teacher'],
        attributes['learningSemester']
    ]);

    const course = result.rows[0];

    const tasks = await getAllSubjectTasks(attributes['subject']);
    const students = await getGroupStudents(attributes['group']);

    for (let user of students) {
        await assignTasksToStudent(tasks, user, course)
    }
};

const getAllSubjectTasks = async (subject) => {
    const query = `
        SELECT tasks.id
        FROM tasks
        JOIN themes ON themes.id = tasks.theme_id
        WHERE themes.subject_id = $1
    `;

    const result = await db.query(query, [
        subject
    ]);

    return result.rows;
};

const getGroupStudents = async (group) => {
    const query = `
        SELECT * FROM users WHERE group_id = $1
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

const assignTasksToStudent = async (tasks, student, course) => {
    const query = `
        INSERT INTO subject_group_task(task_id, student_id, subject_group_id, status, rating, created_at, updated_at, deadline_date)
        VALUES ($1, $2, $3, 'backlog', 0, NOW(), NOW(), NOW())
    `;

    for (let task of tasks) {

        await db.query(query, [
            task.id,
            student.id,
            course.id
        ]);
    }
};
