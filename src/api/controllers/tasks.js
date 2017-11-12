import { moveTaskService, getTaskService } from '../services/courses';

export const moveTaskAction = async (req, res, next) => {
    const attributes = Object.assign({}, req.params, req.body);
    await moveTaskService(attributes);

    res.json({});
};

export const getTaskAction = async (req, res, next) => {
    const task = await getTaskService(req.params);

    if (!task) {
        return res.status(404).json({
            message: 'Task by specific credentials not found',
        });
    }

    return res.json(task);
};
