import { getUsersService } from '../services/users';

export const getUsers = async (req, res, next) => {
    const users = await getUsersService();

    res.json({
        'users': users
    });
}
