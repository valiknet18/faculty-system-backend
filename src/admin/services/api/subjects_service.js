import subjectsRepository from '../../repositories/subjects_repository';
import Subject from "../../../common/models/subject";

class SubjectsService {
    /**
     * @param {SubjectsRepository} subjectsRepository
     */
    constructor(subjectsRepository) {
        this._subjectsRepository = subjectsRepository;
    }

    /**
     * Create subject
     * @param {Object} attributes
     * @return {Promise.<Subject>}
     */
    async createSubject(attributes) {
        return await this._subjectsRepository.createSubject(
            Subject.fromArray(attributes),
        );
    }

    /**
     * Update subject
     * @param attributes
     * @return {Promise.<Subject>}
     */
    async updateSubject(attributes) {
        return await this._subjectsRepository.updateSubject(
            Subject.fromArray(attributes)
        );
    }

    /**
     * Get list of subjects
     * @return {Promise.<Array.<Subject>>}
     */
    async getSubjects() {
        return await this._subjectsRepository.getSubjects();
    }
}

export default new SubjectsService(subjectsRepository);
