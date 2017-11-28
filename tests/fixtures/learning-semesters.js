import learningSemestersService from "../../src/admin/services/learning_semesters_service";

const learningSemesters = [
    {
        fromDate: '2017-01-01T10:00:00+00:00',
        toDate: '2017-10-01T10:00:00+00:00',
    }
];

const fixtures = async () => {
    for (let learningSemester of learningSemesters) {
        await learningSemestersService.createLearningSemester(learningSemester);
    }
};

export default fixtures;
