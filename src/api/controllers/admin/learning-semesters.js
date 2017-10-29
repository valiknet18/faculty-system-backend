import { createLearningSemesterService, getLearningSemestersService } from '../../services/admin/learning-semesters';

export const createLearningSemesterAction = async (req, res, next) => {
    await createLearningSemesterService(req.body);

    res.status(201).json({});
};

export const getLearningSemestersAction = async (req, res, next) => {
    const learningSemesters = await getLearningSemestersService();

    res.json({
        learningSemesters: learningSemesters
    });
};

