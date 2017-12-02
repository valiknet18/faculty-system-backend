import learningSemestersService from '../services/learning_semesters_service';

class LearningSemestersController {
    /**
     * @param {LearningSemestersService} learningSemestersService
     */
    constructor(learningSemestersService) {
        this._learningSemestersService = learningSemestersService;
    }

    /**
     * Create learning semester
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async createLearningSemesterAction(req, res) {
        const learningSemester = await this._learningSemestersService.createLearningSemester({
            from_date: req.body.fromDate,
            to_date: req.body.toDate,
        });

        res.status(201).json(learningSemester);
    }

    /**
     * Update learning semester
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async updateLearningSemesterAction(req, res) {
        const learningSemester = await this._learningSemestersService.updateLearningSemester({
            id: req.params.learning_semester,
            from_date: req.body.fromDate,
            to_date: req.body.toDate,
        });

        res.json(learningSemester);
    }

    /**
     * Get list of learning semesters
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async getLearningSemestersAction(req, res) {
        const learningSemesters = await this._learningSemestersService.getLearningSemesters();

        res.json({
            learningSemesters: learningSemesters
        });
    }
}

export default new LearningSemestersController(learningSemestersService);
