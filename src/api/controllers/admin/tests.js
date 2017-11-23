import {
    createTestService,
    getTestsService
} from "../../services/admin/tests";

export const getTestsAction = async (req, res) => {
    const tests = await getTestsService(req.query);

    res.json({
        tests: tests,
    })
};

export const createTestAction = async (req, res) => {
    const attributes = Object.assign({}, req.query, req.body);

    await createTestService(attributes);

    res.status(201).json({})
};
