export const checkAdmin = (req, res, next) => {
    if (!req.user.isAdmin) {
        res.status(403)
            .json({
                'message': 'Permission denied'
            });

        return;
    }
    
    next();
};
