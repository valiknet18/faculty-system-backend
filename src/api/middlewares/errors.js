export const handleAuthErrors = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({
            'message': 'invalid token'
        });
    }
};
