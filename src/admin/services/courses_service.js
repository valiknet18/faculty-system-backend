import coursesRepository from '../repositories/courses_repository';
import tasksRepository from '../repositories/tasks_repository';
import groupsRepository from '../repositories/groups_repository';
import Course from "../../common/models/course";

class CoursesService {
    /**
     * @param {CoursesRepository} coursesRepository
     * @param {TasksRepository} tasksRepository
     * @param {GroupsRepository} groupsRepository
     */
    constructor(coursesRepository, tasksRepository, groupsRepository) {
        this._coursesRepository = coursesRepository;
        this._tasksRepository = tasksRepository;
        this._groupsRepository = groupsRepository;
    }

    /**
     * @return {Promise.<Array<Course>>}
     */
    async getCourses() {
        return await this._coursesRepository.getCourses();
    }

    /**
     * Crete course
     * @param {Object} attributes
     * @return {Promise.<void>}
     */
    async createCourse(attributes) {
        const course = await this._coursesRepository.createCourse(
            Course.fromArray(attributes)
        );

        const tasks = await this._tasksRepository.getTasksBySubject(course.subject);
        const students = await this._groupsRepository.getStudents(course.group);

        for (let user of students) {
            await this._coursesRepository.assignTasksToStudent(tasks, user, course)
        }

        return course;
    }
}

export default new CoursesService(coursesRepository, tasksRepository, groupsRepository);
