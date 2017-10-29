import { getCourseService, getUserTasks, getCourseTasks, getCoursesService } from '../services/courses';

export const getCoursesAction = async (req, res, next) => {
    const courses = await getCoursesService(req.user);

    res.json({
        courses: courses
    });
};

export const getCourseAction = async (req, res, next) => {
    const course = await getCourseService(req.params);

    res.json(course);
};

export const getTasksAction = async (req, res, next) => {
    let tasks = [];

    if (req.user.isTeacher()) {
        tasks = await getCourseTasks(req.params);
    } else {
        tasks = await getUserTasks(req.params, req.user);
    }

    res.json({
        tasks: tasks
    });
};
