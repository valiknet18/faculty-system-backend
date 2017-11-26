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
            LearningSemester.fromArray({
                from_date: attributes.fromDate,
                to_date: attributes.toDate,
            })
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
