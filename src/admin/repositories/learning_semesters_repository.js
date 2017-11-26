import db from '../../common/connection/db';
import Collection from '../../common/utils/collection';
import LearningSemester from '../../common/models/learningSemester';

class LearningSemestersRepository {
    constructor(db) {
        this._db = db;
    }

    /**
     * Create learning semester
     * @param {LearningSemester} learningSemester
     * @return {Promise.<LearningSemester>}
     */
    async createLearningSemesters(learningSemester) {
        const query = `
            INSERT INTO learning_semesters(from_date, to_date) VALUES ($1, $2) RETURNING id
        `;

        const result = await this._db.query(query, [
            learningSemester.fromDate,
            learningSemester.toDate
        ]);

        learningSemester.setId(result.rows[0].id);

        return learningSemester;
    }

    /**
     * Get list of learning semesters
     * @return {Promise.<Array<LearningSemester>>}
     */
    async getLearningSemesters() {
        const query = `
            SELECT * FROM learning_semesters
        `;

        const result = await this._db.query(query);

        return Collection.convert(LearningSemester, result.rows);
    }
}

export default new LearningSemestersRepository(db);
