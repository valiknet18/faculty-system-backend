import testsService from '../services/tests_service';

class TestsController {
    /**
     * @param {TestsService} testsService
     */
    constructor(testsService) {
        this._testsService = testsService;
    }

    /**
     * Get tests
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async getTestsAction(req, res) {
        const tests = await this._testsService.getTests(req.params.subject);

        return res.json({
            tests: tests,
        })
    }

    /**
     * Create test
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async createTestAction(req, res) {
        const attributes = Object.assign({}, req.body, {
            subject: req.params.subject,
        });

        const test = await this._testsService.createTest(attributes);

        return res.status(201).json(test)
    }
}

export default new TestsController(testsService);
