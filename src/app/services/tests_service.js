import testsRepository from '../repositories/tests_repository';

class TestsService {
    /**
     * @param {TestsRepository} testsRepository
     */
    constructor(testsRepository) {
        this._testsRepository = testsRepository;
    }

    /**
     * Get test
     * @param test
     * @return {Promise.<*>}
     */
    async getTest(test) {
        return await this._testsRepository.getTest(test);
    }

    async startTest() {

    }

    async endTest() {

    }
}

export default new TestsService(testsRepository);
