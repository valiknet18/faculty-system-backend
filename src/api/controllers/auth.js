import { authService, jwtService } from '../services/auth';
import { serialize } from '../serializers/users';

export const login = async (req, res, next) => {
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
            profile: serialize(user)
        });
};
