import {
    createSubjectService,
    getSubjectsService,
    updateSubjectService,
    removeTeachersFromSubject,
    addTeachersToSubject
} from '../../services/admin/subjects';

export const createSubjectAction = async (req, res, next) => {
    const subject = await createSubjectService(req.body);

    res.status(201).json(subject);
};

export const getSubjectsAction = async (req, res, next) => {
    const subjects = await getSubjectsService();

    res.json({
        subjects: subjects
    });
};

export const updateSubjectAction = async (req, res, next) => {
    const attributes = Object.assign({}, req.body, req.params);
    const subject = await updateSubjectService(attributes);

    if (!subject) {
        res.status(404).json({
            'message': 'Subject not found'
        });

        return;
    }

    await removeTeachersFromSubject(attributes);
    await addTeachersToSubject(attributes);

    res.json(subject);
};
