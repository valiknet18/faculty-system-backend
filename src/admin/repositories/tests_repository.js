import db from '../../common/connection/db';
import Collection from "../../common/utils/collection";
import Task from "../../common/models/task";

class TestsRepository {
    constructor(db) {
        this._db = db;
    }

    /**
     * Get tests
     * @param {int} subject
     * @return {Promise.<Array>}
     */
    async getTests(subject) {
        const query = `
            SELECT * FROM tests WHERE subject_id=$1
        `;

        const result = await this._db.query(query, [subject]);

        return Collection.convert(Task, result.rows);
    }

    /**
     * Create test
     * @param {Test} test
     * @return {Promise.<Test>}
     */
    async createTest(test) {
        const query = `
            INSERT INTO tests(title, subject_id, created_at, updated_at) 
            VALUES($1, $2, NOW(), NOW())
            RETURNING id
        `;

        const result = await this._db.query(query, [
            test.title,
            test.subject.id,
        ]);

        test.setId(result.rows[0].id);

        return test;
    }
}

export default new TestsRepository(db);
