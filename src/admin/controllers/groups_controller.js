import groupsService from '../services/api/groups_service'

class GroupsController {
    /**
     * @param {GroupsService} groupsService
     */
    constructor(groupsService) {
        this._groupsService = groupsService;
    }

    /**
     * Get groups
     * @return {Promise.<void>}
     */
    async getGroupsAction(req, res) {
        const groups = await this._groupsService.getGroups();

        return res.json({
            groups: groups
        });
    }

    /**
     * Get group
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async getGroupAction(req, res) {
        let group = await getGroupService(req.params);
        const students = await getGroupStudentsService(req.params);

        group = Object.assign({}, group, {
            students: students
        });

        res.json(group);
    }

    /**
     * Create group
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async createGroupAction(req, res) {
        const group = await this._groupsService.createGroup(req.body);

        return res
            .status(201)
            .json(group);
    }

    /**
     * Update group
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async updateGroupAction(req, res) {
        const attributes = Object.assign({}, req.body, {
            id: req.params.group
        });
        const group = await this._groupsService.updateGroup(attributes);

        return res.json(group);
    }
}

export default new GroupsController(groupsService);
