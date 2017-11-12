import express from 'express';
import { loginAction, registrationAction, checkRegistrationAction } from '../controllers/auth';
import { loginChecker } from '../security/auth';

const router = express.Router();

/**
 * @api {post} /auth/login authorization user
 * @apiGroup AUTH
 * @apiSuccess {String} token Auth token
 * @apiSuccess {Object[]} profile User profile object
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "token": "",
 *      "profile": {}
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/login', loginChecker, loginAction);

router.post('/registration', loginChecker, registrationAction);

router.get('/registration', loginChecker, checkRegistrationAction);

export default router;
