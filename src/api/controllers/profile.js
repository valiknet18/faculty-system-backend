import { 
    getSubjectsListService as studentsSubjectsListService 
} from '../services/students/subjects';
import {
    getSubjectsListService as teachersSubjectsListService
} from '../services/teachers/subjects';
import { serializeList } from '../serializers/subjects';

export const getSubjectsList = async (req, res, next) => {
    let subjects = [];

    if (req.user.getRole() == 'teacher') {
        subjects = await teachersSubjectsListService(req.user);
    } else {
        subjects = await studentsSubjectsListService(req.user);
    }

    return res.json({
        subjects: serializeList(subjects)
    });
}
