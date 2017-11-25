import {
    createTestService,
    getTestsService
} from "../../services/admin/tests";

export const getTestsAction = async (req, res) => {
    const tests = await getTestsService(req.params);

    res.json({
        tests: tests,
    })
};

export const createTestAction = async (req, res) => {
    const attributes = Object.assign({}, req.params, req.body);

    await createTestService(attributes);

    res.status(201).json({})
};
