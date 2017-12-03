import learningSemestersService from "../../src/admin/services/learning_semesters_service";

const learningSemesters = [
    {
        from_date: '2017-01-01T10:00:00+0000',
        to_date: '2017-10-01T10:00:00+0000',
    }
];

const fixtures = async () => {
    for (let learningSemester of learningSemesters) {
        await learningSemestersService.createLearningSemester(learningSemester);
    }
};

export default fixtures;
