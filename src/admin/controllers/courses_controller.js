import coursesService from '../services/courses_service';

class CoursesController {
    /**
     * @param {CoursesService} coursesService
     */
    constructor(coursesService) {
        this._coursesService = coursesService;
    }

    /**
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async createCourseAction(req, res) {
        const course = await this._coursesService.createCourse(req.body);

        res.status(201).json(course);
    }

    /**
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async getCoursesAction(req, res) {
        const courses = await this._coursesService.getCourses();

        res.json({
            courses: courses
        });
    }
}

export default new CoursesController(coursesService);
