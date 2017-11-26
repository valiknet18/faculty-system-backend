import coursesRepository from '../repositories/courses_repository';

class CoursesService {
    /**
     * @param {CoursesRepository} coursesRepository
     */
    constructor(coursesRepository) {
        this._coursesRepository = coursesRepository;
    }

    /**
     * Get courses
     * @param {User} user
     * @return {Promise.<Array>}
     */
    async getCourses(user) {
        let courses;

        if (user.isTeacher()) {
            courses = await this._coursesRepository.getTeacherCourses(user);
        } else {
            courses = await this._coursesRepository.getStudentCourses(user);
        }

        return courses;
    }

    /**
     * Get course
     * @param course
     * @return {Promise.<*>}
     */
    async getCourse(course) {
        return await this._coursesRepository.getCourse(course);
    }
}

export default new CoursesService(coursesRepository);
