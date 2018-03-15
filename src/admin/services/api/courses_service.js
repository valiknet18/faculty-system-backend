import coursesRepository from '../../repositories/courses_repository';
import tasksRepository from '../../repositories/tasks_repository';
import groupsRepository from '../../repositories/groups_repository';
import learningSemestersRepository from '../../repositories/learning_semesters_repository';
import Course from "../../../common/models/course";
import calculateDeadlineDateService from "../calculate_task_deadline_date_service";

class CoursesService {
    /**
     * @param {CoursesRepository} coursesRepository
     * @param {TasksRepository} tasksRepository
     * @param {GroupsRepository} groupsRepository
     * @param {LearningSemestersRepository} learningSemestersRepository
     * @param {CalculateTaskDeadlineDateService} calculateDeadlineDateService
     */
    constructor(
        coursesRepository,
        tasksRepository,
        groupsRepository,
        learningSemestersRepository,
        calculateDeadlineDateService
    ) {
        this._coursesRepository = coursesRepository;
        this._tasksRepository = tasksRepository;
        this._groupsRepository = groupsRepository;
        this._learningSemestersRepository = learningSemestersRepository;
        this._calculateDeadlineDateService = calculateDeadlineDateService;
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

        const learningSemester = await this._learningSemestersRepository.getActiveLearningSemester();
        const tasks = await this._tasksRepository.getTasksBySubject(course.subject);
        const courseTasks = this._calculateDeadlineDateService.calculateDeadlineDate(course, tasks, learningSemester);
        const students = await this._groupsRepository.getStudents(course.group);

        console.log(courseTasks);

        for (let user of students) {
            for (let courseTask of courseTasks) {
                console.log(courseTask);

                await this._coursesRepository.assignTasksToStudent(courseTask, user, course)
            }
        }

        return course;
    }
}

export default new CoursesService(
    coursesRepository,
    tasksRepository,
    groupsRepository,
    learningSemestersRepository,
    calculateDeadlineDateService
);
