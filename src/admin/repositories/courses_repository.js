import db from '../../common/connection/db';
import Collection from "../../common/utils/collection";
import Course from "../../common/models/course";
import User from "../../common/models/user";

class CoursesRepository {
    constructor(db) {
        this._db = db;
    }

    /**
     * Get list of courses
     * @return {Promise.<Array>}
     */
    async getCourses() {
        const query = `
            SELECT c.id as id, s.name as subject_name, 
                t.first_name as teacher_first_name, t.last_name as teacher_last_name, 
                g.name as group_name
            FROM subject_group as c
            JOIN users as t ON t.id = c.teacher_id
            JOIN groups as g ON g.id = c.group_id
            JOIN subjects as s ON s.id = c.subject_id
        `;

        const result = await this._db.query(query);

        return Collection.convert(Course, result.rows);
    }

    /**
     * Create course
     * @param {Course} course
     * @return {Promise.<Course>}
     */
    async createCourse(course) {
        const query = `
            INSERT INTO subject_group(subject_id, group_id, teacher_id, learning_semester_id, finish_date, created_at, updated_at) 
            VALUES($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING id
        `;

        const result = await this._db.query(query, [
            course.subject.id,
            course.group.id,
            course.teacher.id,
            course.learningSemester.id,
            course.finishDate,
        ]);

        course.setId(result.rows[0].id);

        return course;
    }

    /**
     * Assign task to student
     * @param {CourseTask} courseTask
     * @param {User} student
     * @param {Course} course
     * @return {Promise.<void>}
     */
    async assignTasksToStudent(courseTask, student, course) {
        const query = `
            INSERT INTO subject_group_task(task_id, student_id, subject_group_id, status, rating, created_at, updated_at, deadline_date)
            VALUES ($1, $2, $3, 'backlog', 0, NOW(), NOW(), NOW())
        `;

        await this._db.query(query, [
            courseTask.task.id,
            student.id,
            course.id
        ]);
    }
}

export default new CoursesRepository(db);
