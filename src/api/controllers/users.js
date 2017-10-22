import { getUsersService } from '../services/users';

export const getUsersAction = async (req, res, next) => {
    const users = await getUsersService();

    res.json({
        users: users
    });
};
