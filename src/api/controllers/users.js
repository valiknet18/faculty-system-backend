import { getUsersService, getStudentsListService } from '../services/users';

export const getUsersAction = async (req, res, next) => {
    const users = await getUsersService();

    res.json({
        users: users
    });
};

export const getStudentsAction = async (req, res, next) => {
    const users = await getStudentsListService();

    res.json({
        users: users
    });
};
