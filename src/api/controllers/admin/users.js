import {
    inviteUserService,
    getUsersListService,
    getTeachersService,
    editUserService,
    getUserService
} from '../../services/admin/users';

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

export const getTeachersAction = async (req, res, next) => {
    const teachers = await getTeachersService();

    res.json({
        teachers: teachers
    });
};

export const editUserAction = async (req, res, next) => {
    const attributes = Object.assign({}, req.params, req.body);

    await editUserService(attributes);

    res.json({});
};

export const getUserAction = async (req, res, next) => {
    const user = await getUserService(req.params);

    if (!user) {
        return res.json(404).json({
            message: 'User with current parameters not found'
        });
    }

    res.json(user);
};
