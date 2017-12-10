import learningSemestersService from "../../src/admin/services/api/learning_semesters_service";
import moment from "moment";

const learningSemesters = [
    {
        fromDate: moment("2017-09-01T00:00:00+03:00").format(),
        toDate: moment("2017-12-30T00:00:00+02:00").format(),
        isEnabled: 1,
    }
];

const fixtures = async () => {
    for (let learningSemester of learningSemesters) {
        await learningSemestersService.createLearningSemester(learningSemester);
    }
};

export default fixtures;
