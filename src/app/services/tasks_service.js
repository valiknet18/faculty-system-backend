import tasksRepository from '../repositories/tasks_repository';

class TasksService {
    /**
     * @param {TasksRepository} tasksRepository
     */
    constructor(tasksRepository) {
        this._tasksRepository = tasksRepository;
    }

    /**
     * Get tasks
     * @param {User} user
     * @param {int} course
     * @return {Promise.<*>}
     */
    async getTasks(user, course) {
        let tasks;

        if (user.isTeacher()) {
            tasks = await this._tasksRepository.getCourseTasks(course);
        } else {
            tasks = await this._tasksRepository.getUserTasks(user, course);
        }

        return tasks;
    }

    /**
     * Get task
     * @param {int} task
     * @return {Promise.<Task>}
     */
    async getTask(task) {
        return await this._tasksRepository.getTask(task);
    }

    /**
     * @param {int} task
     * @param {string} status
     * @return {Promise.<void>}
     */
    async moveTask(task, status) {
        await this._tasksRepository.moveTask(task, status);
    }
}

export default new TasksService(tasksRepository);
