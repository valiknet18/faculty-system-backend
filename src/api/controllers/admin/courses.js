import { createCourseService } from '../../services/admin/courses';

export const createCourseAction = async (req, res, next) => {
    await createCourseService(req.body);

    res.json(201).json({});
};
