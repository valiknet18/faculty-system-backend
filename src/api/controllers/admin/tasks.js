import {
    getTasksService,
    createTaskService
} from '../../services/admin/tasks';

export const getTasksAction = async (req, res, next) => {
    const tasks = await getTasksService(req.params);

    res.json({
        tasks: tasks
    });
};

export const createTaskAction = async (req, res, next) => {
    const attributes = Object.assign({}, req.body, req.params);

    await createTaskService(attributes);

    res.status(201).json({})
};
