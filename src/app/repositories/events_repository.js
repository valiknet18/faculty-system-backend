import db from '../../common/connection/db';
import Collection from "../../common/utils/collection";
import User from "../../common/models/user";
import CourseTask from "../../common/models/course_task";

export class EventsRepository {
    constructor(db) {
        this._db = db;
    }

    /**
     * Get events
     * @param user
     * @return {Promise.<Array>}
     */
    async getEvents(user) {
        const query = `
            SELECT s_g_t.id, t.title as task_title, s_g_t.created_at, s_g_t.deadline_date, s_g_t.subject_group_id as course_id
            FROM subject_group_task as s_g_t
            JOIN tasks as t ON t.id = s_g_t.task_id
            WHERE s_g_t.student_id = $1
        `;

        const result = await this._db.query(query, [
            user.id,
        ]);

        return Collection.convert(CourseTask, result.rows);
    }
}

export default new EventsRepository(db);
