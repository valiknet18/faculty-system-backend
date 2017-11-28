import usersService from '../services/users_service';
import NotFoundError from "../../common/exceptions/not_found_error";
import * as Exceptions from "../../common/exceptions/exceptions";

class UsersController {
    /**
     * @param {UsersService} usersService
     */
    constructor(usersService) {
        this._usersService = usersService;
    }

    /**
     * Invite user to system
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async inviteUserAction(req, res) {
        await this._usersService.inviteUser(req.body);

        res.status(201).json({});
    }

    /**
     * Get users action
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async getUsersAction(req, res) {
        const users = await this._usersService.getUsers();

        res.json({
            users: users
        });
    }

    /**
     * Get teachers action
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async getTeachersAction(req, res) {
        const teachers = await this._usersService.getTeachers();

        res.json({
            teachers: teachers
        });
    }

    /**
     * Get user
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async getUserAction(req, res) {
        try {
            const user = await this._usersService.getUser(req.params.user);

            return res.json(user);
        } catch (exception) {
            if (exception instanceof NotFoundError) {
                return res.status(404).json({
                    message: Exceptions.USER_WITH_CURRENT_PARAMETERS_NOT_FOUND,
                });
            }
        }
    }

    /**
     * Edit user
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async editUserAction(req, res) {
        const attributes = Object.assign({}, req.body, {
            id: req.params.user,
        });

        const user = await this._usersService.updateUser(attributes);

        res.json(user);
    }
}

export default new UsersController(usersService);
