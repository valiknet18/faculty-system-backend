import coursesService from '../services/courses_service';

class CoursesController {
    /**
     * @param {CoursesService} coursesService
     */
    constructor(coursesService) {
        this._coursesService = coursesService;
    }

    /**
     * Get courses action
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async getCoursesAction(req, res) {
        let courses = await this._coursesService.getCourses(req.user);

        return res.json({
            courses: courses
        });
    }

    /**
     * Get course action
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async getCourseAction(req, res) {
        const course = await this._coursesService.getCourse(req.params.course);

        return res.json(course);
    }
}

export default new CoursesController(coursesService);
