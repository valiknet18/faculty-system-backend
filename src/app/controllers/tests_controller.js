import testsService from '../services/tests_service';

class TestsController {
    /**
     * @param {TestsService} testsService
     */
    constructor(testsService) {
        this._testsService = testsService;
    }

    async getTestAction(req, res) {
    }

    async startTestAction(req, res) {

    }

    async finishTestAction(req, res) {

    }
}

export default new TestsController(testsService);
