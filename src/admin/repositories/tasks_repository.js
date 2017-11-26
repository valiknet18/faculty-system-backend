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
            SELECT tasks.id, tasks.title, tasks.content
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
            INSERT INTO tasks(title, content, test_id, theme_id, created_at, updated_at) 
            VALUES($1, $2, null, $3, NOW(), NOW())
            RETURNING id
        `;

        const result = await db.query(query, [
            task.title,
            task.content,
            task.theme.id
        ]);

        task.setId(result.rows[0].id);

        return task;
    }
}

export default new TasksRepository(db);
