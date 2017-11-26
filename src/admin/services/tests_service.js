import testsRepository from '../repositories/tests_repository';
import Test from "../../common/models/test";

class TestsService {
    /**
     * @param {TestsRepository} testsRepository
     */
    constructor(testsRepository) {
        this._testsRepository = testsRepository;
    }

    /**
     * Get tests
     * @param {Object} subject
     * @return {Promise.<Array>}
     */
    async getTests(subject) {
        return await this._testsRepository.getTests(subject);
    }

    /**
     * @param {Object} attributes
     * @return {Promise.<Test>}
     */
    async createTest(attributes) {
        return await this._testsRepository.createTest(
            Test.fromArray(attributes)
        );
    }
}

export default new TestsService(testsRepository);
