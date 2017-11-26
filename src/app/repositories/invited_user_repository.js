import db from '../../common/connection/db';
import NotFoundError from "../../common/exceptions/not_found_error";

class InvitedUserRepository {
    /**
     * @param db
     */
    constructor(db) {
        this._db = db;

        this.getUserByToken = this.getUserByToken.bind(this);
    }
}

export default new InvitedUserRepository(db);
