import tasksRepository from '../repositories/tasks_repository';
import Task from "../../common/models/task";

class TasksService {
    /**
     * @param {TasksRepository} tasksRepository
     */
    constructor(tasksRepository) {
        this._tasksRepository = tasksRepository;
    }

    /**
     * Create task
     * @param {Object} attributes
     * @return {Promise.<*>}
     */
    async createTask(attributes) {
        return await this._tasksRepository.createTask(
            Task.fromArray(attributes)
        );
    }

    /**
     * Get tasks
     * @param {int} theme
     * @return {Promise.<Array>}
     */
    async getTasks(theme) {
        return await this._tasksRepository.getTasksByTheme(theme);
    }
}

export default new TasksService(tasksRepository);
