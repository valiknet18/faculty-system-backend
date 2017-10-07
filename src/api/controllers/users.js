import { getUsersService } from '../services/users';
import { serializeList } from '../serializers/users';

export const getUsersAction = async (req, res, next) => {
    const users = await getUsersService();

    res.json({
        'users': serializeList(users)
    });
};
