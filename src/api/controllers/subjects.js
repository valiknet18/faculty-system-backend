import { createSubjectService, getSubjectsService } from '../services/subjects';
import { serialize, serializeList } from '../serializers/subjects';

export const createSubjectAction = async (req, res, next) => {
    const subject = await createSubjectService(req.body);

    res.status(201).json(serialize(subject));
};

export const getSubjectsAction = async (req, res, next) => {
    const subjects = await getSubjectsService();

    res.json({
        subjects: serializeList(subjects)
    });
};
