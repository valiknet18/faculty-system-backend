import { createLearningSemesterService } from '../../services/admin/learning-semesters';

export const createLearningSemesterAction = async (req, res, next) => {
    await createLearningSemesterService(req.body);

    res.status(201).json({});
};
