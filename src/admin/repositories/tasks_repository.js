import db from '../../common/connection/db';
import Collection from "../../common/utils/collection";
import Task from "../../common/models/task";

class TasksRepository {
    constructor(db) {
        this._db = db;
    }

    /**
     * Get all tasks by subject
     * @param {Subject} subject
     * @return {Promise.<Array<Subject>>}
     */
    async getTasksBySubject(subject) {
        const query = `
            SELECT tasks.id, tasks.title, tasks.content, tasks.points
            FROM tasks
            JOIN themes ON themes.id = tasks.theme_id
            WHERE themes.subject_id = $1
        `;

        const result = await this._db.query(query, [
            subject.id
        ]);

        return Collection.convert(Task, result.rows);
    }

    /**
     * Get tasks by theme
     * @param theme
     * @return {Promise.<Array>}
     */
    async getTasksByTheme(theme) {
        const query = `
            SELECT * FROM tasks WHERE theme_id = $1
        `;

        const result = await db.query(query, [
            theme
        ]);

        return Collection.convert(Task, result.rows);
    }

    /**
     * Create task
     * @param {Task} task
     * @return {Promise.<Task>}
     */
    async createTask(task) {
        const query = `
            INSERT INTO tasks(title, content, points, test_id, theme_id, created_at, updated_at) 
            VALUES($1, $2, $3, $4, $5, NOW(), NOW())
            RETURNING id
        `;

        const result = await db.query(query, [
            task.title,
            task.content,
            task.points,
            task.test ? task.test.id : null,
            task.theme.id,
        ]);

        task.setId(result.rows[0].id);

        return task;
    }

    /**
     * Update task
     * @param {Task} task
     * @return {Promise.<Task>}
     */
    async updateTask(task) {
        const query = `
            UPDATE tasks SET title=$1, content=$2, test_id=$3, points=$4 WHERE id=$5
        `;

        await db.query(query, [
            task.title,
            task.content,
            task.test ? task.test.id : null,
            task.points,
            task.id,
        ]);

        return task;
    }
}

export default new TasksRepository(db);
