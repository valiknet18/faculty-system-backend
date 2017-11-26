import db from '../../common/connection/db';
import Collection from "../../common/utils/collection";
import Group from "../../common/models/group";
import User from "../../common/models/user";

class GroupsRepository {
    /**
     * @param db
     */
    constructor(db) {
        this._db = db;
    }

    /**
     * @return {Promise.<Array<Group>>}
     */
    async getGroups() {
        const query = `
            SELECT * FROM groups
        `;

        const result = await this._db.query(query);

        return Collection.convert(Group, result.rows);
    }

    /**
     * Create group
     * @param {Group} group
     * @return {Promise.<Group>}
     */
    async createGroup(group) {
        const query = `
            INSERT INTO groups(name)
            VALUES($1)
            RETURNING id
        `;

        const result = await this._db.query(query, [
            group.name
        ]);

        group.setId(result.rows[0].id);

        return group;
    }

    /**
     * Update group
     * @param {Group} group
     * @return {Promise.<Group>}
     */
    async updateGroup(group) {
        const query = `
            UPDATE groups SET name=$1 WHERE id=$2
        `;

        await this._db.query(query, [
            group.name,
            group.id,
        ]);

        return group
    }

    /**
     * Get group students
     * @param {Group} group
     * @return {Promise.<Array<User>>}
     */
    async getStudents(group) {
        const query = `
            SELECT * FROM users WHERE group_id = $1
        `;

        const result = await db.query(query, [group.id]);

        return Collection.convert(User, result.rows);
    }
}

export default new GroupsRepository(db);
