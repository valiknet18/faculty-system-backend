import express from 'express';
import authController from '../controllers/auth_controller';
import { loginChecker } from '../../common/security/auth';

const router = express.Router();

/**
 * @api {post} /auth/getUserByEmailAndPassword Authorization user
 *
 * @apiGroup AUTH
 *
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 *
 * @apiSuccess {String} token Auth token
 * @apiSuccess {Object[]} profile User profile object
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "token": "",
 *      "profile": {}
 *    }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/login', loginChecker, authController.loginAction.bind(authController));

/**
 * @api {post} /auth/registration Registration user
 *
 * @apiGroup AUTH
 *
 * @apiSuccess {String} token Auth token
 * @apiSuccess {Object[]} profile User profile object
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 201 OK
 *    {
 *      "token": "",
 *      "profile": {}
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/registration', loginChecker, authController.registrationAction.bind(authController));

/**
 * @api {get} /auth/registration Check registration user
 *
 * @apiGroup AUTH
 *
 * @apiParam {String} token User token
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    { }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/registration', loginChecker, authController.checkRegistrationAction.bind(authController));

export default router;
