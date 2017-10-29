import { inviteUserService, getUsersListService } from '../../services/admin/users';

export const inviteUserAction = async (req, res, next) => {
    await inviteUserService(req.body);

    res.status(201).json({});
};

export const getUsersAction = async (req, res, next) => {
    const users = await getUsersListService();

    res.json({
        users: users
    });
};
