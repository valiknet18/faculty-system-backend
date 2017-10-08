import { 
    getSubjectsListService as studentsSubjectsListService 
} from '../services/students/courses';
import {
    getSubjectsListService as teachersSubjectsListService
} from '../services/teachers/courses';

export const getSubjectsListAction = async (req, res, next) => {
    let subjects = [];

    if (req.user.isTeacher()) {
        subjects = await teachersSubjectsListService(req.user);
    } else {
        subjects = await studentsSubjectsListService(req.user);
    }

    return res.json({
        subjects: subjects
    });
};
