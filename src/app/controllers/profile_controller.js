class ProfileController {
    async getEventsAction(req, res) {
        const events = await getEventsService(req.user);

        return res.json({
            events: events
        })
    }
}

export default new ProfileController();
