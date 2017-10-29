import {createCourseService, getCoursesService} from '../../services/admin/courses';

export const createCourseAction = async (req, res, next) => {
    await createCourseService(req.body);

    res.json(201).json({});
};


export const getCoursesAction = async (req, res, next) => {
    const courses = await getCoursesService();

    res.json({
        courses: courses
    });
};
