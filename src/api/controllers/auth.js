import { authService, jwtService } from '../services/auth';

export const login = async (req, res, next) => {
    const user = await authService(req.params.username, req.params.password);
    
    if (!user) {
        res.status(404).json({
            'message': 'Invalid parameters'
        });

        return false;
    }

    const token = jwtService(user);

    res.json({
        token: token,
        profile: user.toArray()
    });
};
