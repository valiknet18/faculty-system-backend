import usersRepository from '../../app/repositories/user_repository';

export const authMiddleware = async (req, res, next) => {
    if (req.user) {
        req.user = await usersRepository.getUserByEmail(req.user.email);
    }

    next();
};
