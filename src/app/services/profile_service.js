import eventsRepository from '../repositories/events_repository';

class ProfileService {
    /**
     * @param {EventsRepository} eventsRepository
     */
    constructor(eventsRepository) {
        this._eventsRepository = eventsRepository;
    }

    /**
     * Get events
     * @param {User} user
     * @return {Promise.<Array>}
     */
    async getEvents(user) {
        return await this._eventsRepository.getEvents(user);
    }
}

export default new ProfileService(eventsRepository);
