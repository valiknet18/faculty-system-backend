import { getUserByEmail } from '../services/auth';

export const authMiddleware = async (req, res, next) => {
    if (req.user) {
        req.user = await getUserByEmail(req.user.email);
    }

    next();
};
