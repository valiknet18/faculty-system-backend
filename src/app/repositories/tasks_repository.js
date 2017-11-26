import db from '../../common/connection/db';
import Tasks from "../../common/utils/tasks";
import NotFoundError from "../../common/exceptions/not_found_error";
import Task from "../../common/models/task";

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
            SELECT s_g_t.id, t.title, t.content, s_g_t.status, u.last_name as student_last_name , u.first_name as student_first_name
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
            SELECT s_g_t.id, t.title, t.content, s_g_t.status, u.last_name as student_last_name , u.first_name as student_first_name
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
            SELECT s_g_t.id, t.title, t.content, s_g_t.status, u.last_name as student_last_name , u.first_name as student_first_name
            FROM subject_group_task as s_g_t
            JOIN tasks as t ON t.id = s_g_t.task_id
            JOIN users as u ON u.id = s_g_t.student_id
            WHERE s_g_t.id = $1
        `;

        const result = await this._db.query(query, [task]);

        if (!result.rows.length) {
            throw new NotFoundError();
        }

        return Task.fromArray(result.rows[0]);
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
        ])
    }
}

export default new TasksRepository(db);
