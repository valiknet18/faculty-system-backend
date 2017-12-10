import subjectsService from '../services/api/subjects_service';

class SubjectsController {
    /**
     * @param {SubjectsService} subjectsService
     */
    constructor(subjectsService) {
        this._subjectsService = subjectsService;
    }

    /**
     * Create subject
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async createSubjectAction(req, res) {
        const subject = await this._subjectsService.createSubject(req.body);

        return res.status(201).json(subject);
    }

    /**
     * Update subject
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async updateSubjectAction(req, res) {
        const subject = await this._subjectsService.updateSubject(
            Object.assign({}, req.body, {
                id: req.params.subject
            })
        );

        return res.json(subject);
    }

    /**
     * Get list of subjects
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async getSubjectsAction(req, res) {
        const subjects = await this._subjectsService.getSubjects();

        return res.json({
            subjects: subjects
        });
    }
}

export default new SubjectsController(subjectsService);
