import groupsRepository from '../repositories/groups_repository';
import Group from "../../common/models/group";

class GroupsService {
    /**
     * @param {GroupsRepository} groupsRepository
     */
    constructor(groupsRepository) {
        this._groupsRepository = groupsRepository;
    }

    /**
     * Get groups
     * @return {Promise.<Array.<Group>>}
     */
    async getGroups() {
        return await this._groupsRepository.getGroups();
    }

    /**
     * Create group
     * @param {Array} attributes
     * @return {Promise.<Group>}
     */
    async createGroup(attributes) {
        const group = Group.fromArray(attributes);

        return await this._groupsRepository.createGroup(group);
    }

    /**
     * Update group
     * @param {Array} attributes
     * @return {Promise.<Group>}
     */
    async updateGroup(attributes) {
        const group = Group.fromArray(attributes);

        return await this._groupsRepository.updateGroup(group);
    }
}

export default new GroupsService(groupsRepository);
