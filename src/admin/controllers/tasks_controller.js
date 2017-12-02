import tasksService from '../services/tasks_service';

class TasksController {
    /**
     * @param {TasksService} tasksService
     */
    constructor(tasksService) {
        this._tasksService = tasksService;
    }

    /**
     * Get tasks
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async getTasksAction(req, res) {
        const tasks = await this._tasksService.getTasks(req.params.theme);

        return res.json({
            tasks: tasks
        });
    }

    /**
     * Create task
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async createTaskAction(req, res) {
        const attributes = Object.assign({}, req.body, {
            theme: req.params.theme,
        });

        const task = await this._tasksService.createTask(attributes);

        return res.status(201).json(task)
    }

    /**
     * Update task action
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async updateTaskAction(req, res) {
        const attributes = Object.assign({}, req.body, {
            theme: req.params.theme,
            id: req.params.task,
        });

        const task = await this._tasksService.updateTask(attributes);

        return res.json(task);
    }
}

export default new TasksController(tasksService);
