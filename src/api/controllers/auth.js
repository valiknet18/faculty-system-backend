import { authService, jwtService, registrateUserService } from '../services/auth';
import { getUserByToken } from "../services/admin/users";

export const loginAction = async (req, res, next) => {
    const user = await authService(req.body.email, req.body.password);
    
    if (!user) {
        res.status(404).json({
            'message': 'Invalid parameters'
        });

        return false;
    }

    res.status(201)
        .json({
            token: jwtService(user),
            profile: user
        });
};

export const checkRegistrationAction = async (req, res, next) => {
    console.log(req.query.token);

    const invitedUser = await getUserByToken(req.query.token);

    if (!invitedUser) {
        return res.status(404).json({
            'message': 'User by token not found'
        });
    }

    return res.status(200).json(invitedUser);
};

export const registrationAction = async (req, res, next) => {
    const invitedUser = await getUserByToken(req.query.token);

    if (!invitedUser) {
        return res.status(404).json({
            'message': 'User by token not found'
        });
    }

    await registrateUserService(req.body, invitedUser);

    res.status(201).json({});
};
