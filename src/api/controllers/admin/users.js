import { inviteUserService, getStudentsListService } from '../../services/admin/users';

export const inviteUserAction = async (req, res, next) => {
    await inviteUserService(req.body);

    res.status(201).json({});
};

export const getStudentsAction = async (req, res, next) => {
    const users = await getStudentsListService();

    res.json({
        users: users
    });
};
