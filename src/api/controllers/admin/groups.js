import {
    getGroupsListService,
    createGroupService,
    updateGroupService,
    getGroupStudentsService,
    getGroupService
} from '../../services/groups';

export const getGroupsAction = async (req, res, next) => {
    const groups = await getGroupsListService();

    res.json({
        groups: groups
    });
};

export const createGroupAction = async (req, res, next) => {
    const group = await createGroupService(req.body);

    res.status(201).json(group);
};

export const updateGroupAction = async (req, res, next) => {
    const attributes = Object.assign({}, req.body, req.params);
    const group = await updateGroupService(attributes);

    res.json(group);
};

export const getGroupAction = async (req, res, next) => {
    let group = await getGroupService(req.params);
    const students = await getGroupStudentsService(req.params);

    group = Object.assign({}, group, {
        students: students
    });

    res.json(group);
};
