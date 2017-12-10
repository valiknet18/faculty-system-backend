import humps from 'humps';
import moment from "moment";

class LearningSemester {
    /**
     * @param {int} id
     * @param {Date} fromDate
     * @param {Date} toDate
     * @param {bool} isEnabled
     */
    constructor(id, fromDate, toDate, isEnabled) {
        this.id = parseInt(id);
        this.fromDate = moment(fromDate);
        this.toDate = moment(toDate);
        this.isEnabled = isEnabled;
    }

    setId(id) {
        this.id = id;
    }

    /**
     * @param {Object} attributes
     * @return {LearningSemester}
     */
    static fromArray(attributes) {
        attributes = humps.camelizeKeys(attributes);

        return new LearningSemester(
            attributes.id,
            attributes.fromDate,
            attributes.toDate,
            attributes.isEnabled,
        );
    }
}

export default LearningSemester;
