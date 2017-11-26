import NotFoundError from '../../common/exceptions/not_found_error';
import tasksService from '../services/tasks_service';
import * as Exceptions from '../../common/exceptions/exceptions';

class TasksController {
    /**
     * @param {TasksService} tasksService
     */
    constructor(tasksService) {
        this._tasksService = tasksService;
    }

    /**
     * Get tasks action
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async getTasksAction(req, res) {
        try {
            const tasks = await this._tasksService.getTasks(req.user, req.params.course);

            res.json({
                tasks: tasks,
            });
        } catch (exception) {

        }
    }

    /**
     * Get task action
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async getTaskAction(req, res) {
        try {
            const task = await this._tasksService.getTask(req.params.task);

            return res.json(task);
        } catch (exception) {
            if (exception instanceof NotFoundError) {
                return res
                    .status(404)
                    .json({
                        message: Exceptions.TASK_NOT_FOUND,
                    });
            }
        }
    }

    /**
     * Change task status
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async moveTaskAction(req, res) {
        await this._tasksService.moveTask(req.params.task, req.body.status);

        return res.json({});
    }
}

export default new TasksController(tasksService);
