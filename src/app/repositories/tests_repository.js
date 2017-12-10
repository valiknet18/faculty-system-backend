import db from '../../common/connection/db';
import NotFoundError from "../../common/exceptions/not_found_error";
import Test from "../../common/models/test";

class TestsRepository {
    constructor(db) {
        this._db = db;
    }

    async getTest(test) {
        const query = `
            SELECT * FROM tests WHERE id = $1;
        `;

        const result = await this._db.query(query, [test]);

        if (!result.rows.length) {
            throw new NotFoundError();
        }

        return Test.fromArray(result.rows[0]);
    }

    async startTest(test) {

    }
}

export default new TestsRepository(db);
