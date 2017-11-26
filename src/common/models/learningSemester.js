class LearningSemester {
    /**
     * @param {int} id
     * @param {int} fromDate
     * @param {int} toDate
     */
    constructor(id, fromDate, toDate) {
        this.id = id;
        this.fromDate = fromDate;
        this.toDate = toDate;
    }

    setId(id) {
        this.id = id;
    }

    /**
     * @param {Object} attributes
     * @return {LearningSemester}
     */
    static fromArray(attributes) {
        return new LearningSemester(
            attributes.id,
            attributes.from_date,
            attributes.to_date,
        );
    }
}

export default LearningSemester;
