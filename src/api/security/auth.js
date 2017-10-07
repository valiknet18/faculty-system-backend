export const loginChecker = (req, res, next) => {
    if (req.user) {
        res.status(404).json({
            'message': 'You are successfull logged in'
        });
        return;
    }

    next();
}
