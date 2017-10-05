export const index = (req, res) => {
    res.json({
        'test': 'Hello'
    });
};

export const test = (req, res) => {
    res.json({
        'test': 'Hello test'
    });
};
