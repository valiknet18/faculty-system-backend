import { createLearningSemesterService } from '../api/services/admin/learning-semesters';

const learningSemesters = [
    {
        fromDate: '2017-01-01T10:00',
        toDate: '2017-10-01T10:00',
    }
];

const fixtures = async () => {
    for (let learningSemester of learningSemesters) {
        await createLearningSemesterService(learningSemester);
    }
};

export default fixtures;
