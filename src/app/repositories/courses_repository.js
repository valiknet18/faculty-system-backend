import db from '../../common/connection/db';
import Collection from "../../common/utils/collection";
import Course from "../../common/models/course";
import NotFoundError from "../../common/exceptions/not_found_error";
import User from "../../common/models/user";

class CoursesRepository {
    constructor(db) {
        this._db = db;
    }

    /**
     * Get student courses
     * @param {User} user
     * @return {Promise.<Array>}
     */
    async getStudentCourses(user) {
        if (!user.groupId) {
            return [];
        }

        const query = `
            SELECT s_g.id, s.name as subject_name, g.name as group_name, u.first_name as teacher_first_name, u.last_name as teacher_last_name, u.phone as teacher_phone, u.email as teacher_name 
            FROM subject_group as s_g
            JOIN groups as g ON g.id = s_g.group_id
            JOIN users as u ON u.id = s_g.teacher_id
            JOIN subjects as s ON s.id = s_g.subject_id
            WHERE s_g.group_id = $1
        `;

        const result = await this._db.query(query, [user.groupId]);

        return Collection.convert(Course, result.rows);
    }

    /**
     * Get teacher courses
     * @param {User} user
     * @return {Promise.<Array>}
     */
    async getTeacherCourses(user) {
        const query = `
            SELECT s_g.id, s.name as subject_name, g.name as group_name, u.first_name as teacher_first_name, u.last_name as teacher_last_name, u.phone as teacher_phone, u.email as teacher_name 
            FROM subject_group as s_g
            JOIN groups as g ON g.id = s_g.group_id
            JOIN users as u ON u.id = s_g.teacher_id 
            JOIN subjects as s ON s.id = s_g.subject_id
            WHERE s_g.teacher_id = $1
        `;

        const result = await this._db.query(query, [user.id]);

        return Collection.convert(Course, result.rows);
    }

    /**
     * Get course
     * @param {int} course
     * @return {Promise.<*>}
     */
    async getCourse(course) {
        const query = `
            SELECT s_g.id, s.name as subject_name, g.name as group_name, u.first_name as teacher_first_name, u.last_name as teacher_last_name, u.phone as teacher_phone, u.email as teacher_name 
            FROM subject_group as s_g
            JOIN groups as g ON g.id = s_g.group_id
            JOIN users as u ON u.id = s_g.teacher_id 
            JOIN subjects as s ON s.id = s_g.subject_id
            WHERE s_g.id = $1
        `;

        const result = await this._db.query(query, [
            course
        ]);

        if (!result.rows.length) {
            throw new NotFoundError();
        }

        return Course.fromArray(result.rows[0]);
    }

    /**
     * Get course students
     * @param course
     * @return {Promise.<Array>}
     */
    async getCourseStudents(course) {
        const query = `
            SELECT u.id, u.first_name, u.last_name
            FROM subject_group as s_g
            JOIN users as u ON u.group_id = s_g.group_id
            WHERE s_g.id = $1
        `;

        const result = await this._db.query(query, [course]);

        return Collection.convert(User, result.rows)
    }
}

export default new CoursesRepository(db);
