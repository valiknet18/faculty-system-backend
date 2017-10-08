import db from '../../config/db';
import Group from '../models/group';

export const getGroupsListService = async () => {
    const query = `
        SELECT * FROM groups
    `;

    const result = await db.query(query);

    return result.rows;
};

export const createGroupService = async (attributes) => {
    const query = `
        INSERT INTO groups(name)
        VALUES($1)
        RETURNING id, name
    `;

    const result = await db.query(query, [
        attributes['name']
    ]);

    if (!result.rows.length) {
        return false;
    }

    return Group.fromArray(result.rows[0]);
};

export const updateGroupService = async (attributes) => {
    const query = `
        UPDATE groups SET name=$1 WHERE id=$2 RETURNING id, name
    `;

    const result = await db.query(query, [
        attributes['name'],
        attributes['group']
    ]);

    if (!result.rows.length) {
        return false;
    }

    await removeStudentsFromGroup(attributes);
    await addStudentsToGroup(attributes);

    return Group.fromArray(result.rows[0]);
};

export const getGroupService = async (attributes) => {
    console.log(attributes);

    const query = `
        SELECT * FROM groups WHERE id=$1
    `;

    const result = await db.query(query, [
      attributes['group']
    ]);

    if (!result.rows.length) {
      return false;
    }

    return Group.fromArray(result.rows[0]);
};

export const getGroupStudentsService = async (attributes) => {
    const query = `
        SELECT * FROM users WHERE group_id=$1
    `;

    const result = await db.query(query, [
        attributes['group']
    ]);

    return result.rows;
};

const removeStudentsFromGroup = async (attributes) => {
    const query = `
        UPDATE users SET group_id=NULL WHERE group_id=$1
    `;

    await db.query(query, [
        attributes['group']
    ])
};

const addStudentsToGroup = async (attributes) => {
    const query = `
        UPDATE users SET group_id=$1 WHERE id in $2
    `;

    await db.query(query, [
        attributes['group'],
        attributes['students']
    ]);
};
