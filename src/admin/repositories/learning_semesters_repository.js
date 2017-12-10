import db from '../../common/connection/db';
import Collection from '../../common/utils/collection';
import LearningSemester from '../../common/models/learningSemester';
import NotFoundError from "../../common/exceptions/not_found_error";

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
            INSERT INTO learning_semesters(from_date, to_date, is_enabled) VALUES ($1, $2, $3) RETURNING id
        `;

        const result = await this._db.query(query, [
            learningSemester.fromDate.format(),
            learningSemester.toDate.format(),
            learningSemester.isEnabled
        ]);

        learningSemester.setId(result.rows[0].id);

        return learningSemester;
    }

    /**
     * Update learning semester
     * @param {LearningSemester} learningSemester
     * @return {Promise.<LearningSemester>}
     */
    async updateLearningSemesters(learningSemester) {
        const query = `
            UPDATE learning_semesters SET from_date=$1, to_date=$2 WHERE id=$3
        `;

        await this._db.query(query, [
            learningSemester.fromDate,
            learningSemester.toDate,
            learningSemester.id,
        ]);

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

    /**
     * Get active learning semester
     * @return {Promise.<LearningSemester>}
     */
    async getActiveLearningSemester() {
        const query = `
            SELECT * FROM learning_semesters WHERE is_enabled=1 LIMIT 1
        `;

        const result = await this._db.query(query);

        if (!result.rows) {
            throw new NotFoundError();
        }

        return LearningSemester.fromArray(result.rows[0]);
    }
}

export default new LearningSemestersRepository(db);
