import authService from '../services/auth_service';
import NotFoundError from '../../common/exceptions/not_found_error';
import UserPasswordNotCorrectError from '../exceptions/user_password_not_correct_error';
import * as Exceptions from '../../common/exceptions/exceptions';

class AuthController {
    /**
     * @param {AuthService} authService
     */
    constructor(authService) {
        this._authService = authService;
    }

    /**
     * Login action
     * @param req
     * @param res
     * @return {Promise.<boolean>}
     */
    async loginAction(req, res) {
        try {
            const user = await this._authService.getUserByEmailAndPassword(req.body.email, req.body.password);

            return res.status(201)
                .json({
                    token: this._authService.getToken(user),
                    profile: user
                });
        } catch (exception) {
            console.log(exception);

            if (exception instanceof NotFoundError) {
                return res
                    .status(404)
                    .json({
                        message: Exceptions.USER_WITH_CURRENT_PARAMETERS_NOT_FOUND,
                    });
            } else if (exception instanceof UserPasswordNotCorrectError) {
                return res
                    .status(404)
                    .json({
                        message: Exceptions.USER_WITH_CURRENT_PARAMETERS_NOT_FOUND,
                    });
            }
        }
    }

    /**
     * Check registration action
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async checkRegistrationAction(req, res) {
        try {
            const invitedUser = await this._authService.getUserByToken(req.query.token);

            return res.json(invitedUser);
        } catch (exception) {
            if (exception instanceof NotFoundError) {
                return res
                    .status(404)
                    .json({
                        message: Exceptions.USER_BY_TOKEN_NOT_FOUND,
                    });
            }
        }
    }

    /**
     * Registration action
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async registrationAction(req, res) {
        try {
            await this._authService.getUserByToken(req.query.token);

            const user = await this._authService.registration(req.body);

            res.status(201).json(user);
        } catch (exception) {
            if (exception instanceof NotFoundError) {
                return res
                    .status(404)
                    .json({
                        message: Exceptions.USER_BY_TOKEN_NOT_FOUND,
                    });
            }
        }
    };
}

export default new AuthController(authService);
