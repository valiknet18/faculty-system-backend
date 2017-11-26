import db from '../../common/connection/db';
import Collection from "../../common/utils/collection";
import Subject from "../../common/models/subject";

class SubjectsRepository {
    constructor(db) {
        this._db = db;
    }

    /**
     * Create subject
     * @param {Subject} subject
     * @return {Promise.<Subject>}
     */
    async createSubject(subject) {
        const query = `
            INSERT INTO subjects(name) VALUES($1) RETURNING id
        `;

        const result = await this._db.query(query, [
            subject.name
        ]);

        subject.setId(result.rows[0].id);

        return subject;
    }

    /**
     * Update subject
     * @param subject
     * @return {Promise.<Subject>}
     */
    async updateSubject(subject) {
        const query = `
            UPDATE subjects SET name=$1 WHERE id=$2
        `;

        await this._db.query(query, [
            subject.name,
            subject.id,
        ]);

        return subject;
    }

    /**
     * Get list of subjects
     * @return {Promise.<Array<Subject>>}
     */
    async getSubjects() {
        const query = `
            SELECT * FROM subjects
        `;

        const result = await this._db.query(query);

        return Collection.convert(Subject, result.rows);
    }
}

export default new SubjectsRepository(db);
