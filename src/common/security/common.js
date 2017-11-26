export const checkAdmin = (req, res, next) => {
    if (!req.user.getIsAdmin()) {
        res.status(403)
            .json({
                'message': 'Permission denied'
            });

        return;
    }
    
    next();
};
