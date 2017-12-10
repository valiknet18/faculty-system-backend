import profileService from '../services/profile_service';

class ProfileController {
    /**
     *
     * @param {ProfileService} profileService
     */
    constructor(profileService) {
        this._profileService = profileService;
    }

    async getProfileAction(req, res) {
        return res.json(req.user)
    }

    async getEventsAction(req, res) {
        const events = await this._profileService.getEvents(req.user);

        return res.json({
            events: events
        })
    }
}

export default new ProfileController(profileService);
