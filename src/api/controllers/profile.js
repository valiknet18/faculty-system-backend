import { 
    getSubjectsListService as studentsSubjectsListService 
} from '../services/students/courses';
import {
    getSubjectsListService as teachersSubjectsListService
} from '../services/teachers/courses';
import {getEventsService} from "../services/profile";

export const getProfileAction = async (req, res, next) => {
    return res.json(req.user);
};

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

export const getEventsAction = async (req, res, next) => {
    const events = await getEventsService(req.user);

    res.json({
        events: events
    })
};
