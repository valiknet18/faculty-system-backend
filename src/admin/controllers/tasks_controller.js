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

        res.json({
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

        res.status(201).json(task)
    }
}

export default new TasksController(tasksService);
