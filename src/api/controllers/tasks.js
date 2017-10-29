import { moveTaskService } from '../services/courses';

export const moveTaskAction = async (req, res, next) => {
    const attributes = Object.assign({}, req.params, req.body);
    await moveTaskService(attributes);

    res.json({});
};

export const getTaskAction = async (req, res, next) => {
    res.json({});
};
