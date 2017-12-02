import learningSemestersRepository from '../repositories/learning_semesters_repository';
import LearningSemester from '../../common/models/learningSemester';

class LearningSemestersService {
    /**
     * @param {LearningSemestersRepository} learningSemestersRepository
     */
    constructor(learningSemestersRepository) {
        this._learningSemestersRepository = learningSemestersRepository;
    }

    /**
     * Create learning semester
     * @param {Object} attributes
     * @return {Promise.<LearningSemester>}
     */
    async createLearningSemester(attributes) {
        return await this._learningSemestersRepository.createLearningSemesters(
            LearningSemester.fromArray(attributes)
        );
    }

    /**
     * Update learning semester
     * @param {Object} attributes
     * @return {Promise.<LearningSemester>}
     */
    async updateLearningSemester(attributes) {
        return await this._learningSemestersRepository.updateLearningSemesters(
            LearningSemester.fromArray(attributes)
        );
    }

    /**
     * Get list of learning semesters
     * @return {Promise.<Array.<LearningSemester>>}
     */
    async getLearningSemesters() {
        return await this._learningSemestersRepository.getLearningSemesters();
    }
}

export default new LearningSemestersService(learningSemestersRepository);
