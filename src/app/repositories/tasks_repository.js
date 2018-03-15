import db from '../../common/connection/db';
import Tasks from "../../common/utils/tasks";
import NotFoundError from "../../common/exceptions/not_found_error";
import Task from "../../common/models/task";
import CourseTask from "../../common/models/course_task";

class TasksRepository {
    /**
     * @param db
     */
    constructor(db) {
        this._db = db;
    }

    /**
     * Get user tasks
     * @param user
     * @param course
     * @return {Promise.<*>}
     */
    async getUserTasks(user, course) {
        const query = `
            SELECT s_g_t.id, t.id as task_id, s_g_t.deadline_date, t.title as task_title, s_g_t.status, u.last_name as user_last_name , u.first_name as user_first_name
            FROM subject_group_task as s_g_t
            JOIN tasks as t ON t.id = s_g_t.task_id
            JOIN users as u ON u.id = s_g_t.student_id
            WHERE s_g_t.subject_group_id = $1 AND s_g_t.student_id = $2
        `;

        const result = await this._db.query(query, [course, user.id]);

        return Tasks.group(result.rows);
    }

    /**
     * Get course tasks
     * @param course
     * @return {Promise.<Array<Task>>}
     */
    async getCourseTasks(course) {
        const query = `
            SELECT s_g_t.id, t.id as task_id, s_g_t.deadline_date, t.title as task_title, s_g_t.status, u.last_name as user_last_name , u.first_name as user_first_name
            FROM subject_group_task as s_g_t
            JOIN tasks as t ON t.id = s_g_t.task_id
            JOIN users as u ON u.id = s_g_t.student_id
            WHERE s_g_t.subject_group_id = $1
        `;

        const result = await this._db.query(query, [course]);

        return Tasks.group(result.rows);
    }

    /**
     * Get task
     * @param {int} task
     * @return {Promise.<Task>}
     */
    async getTask(task) {
        const query = `
            SELECT s_g_t.id, t.title as task_title, t.content as task_content, s_g_t.status, 
            u.last_name as user_last_name, u.first_name as user_first_name, teacher.email as teacher_email,
            s_g_t.deadline_date, t.test_id, tests.title as test_title
            FROM subject_group_task as s_g_t
            JOIN tasks as t ON t.id = s_g_t.task_id
            JOIN users as u ON u.id = s_g_t.student_id
            JOIN subject_group as s_g ON s_g.id = s_g_t.subject_group_id
            JOIN users as teacher ON teacher.id = s_g.teacher_id
            JOIN tests ON tests.id = t.test_id
            WHERE s_g_t.id = $1
        `;

        const result = await this._db.query(query, [task]);

        if (!result.rows.length) {
            throw new NotFoundError();
        }

        return CourseTask.fromArray(result.rows[0]);
    }

    /**
     *
     * @param {int} task
     * @param {string} status
     * @return {Promise.<void>}
     */
    async moveTask(task, status) {
        const query = `
            UPDATE subject_group_task SET status=$1 WHERE id=$2
        `;

        await this._db.query(query, [
            status,
            task
        ]);
    }
}

export default new TasksRepository(db);
