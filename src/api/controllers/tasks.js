export const updateTaskAction = async (req, res, next) => {
    const parameters = Object.assign({}, req.params, req.body);
    await updateTaskAction(parameters);

    res.json({});
};

export const getTaskAction = async (req, res, next) => {
    res.json({});
};
