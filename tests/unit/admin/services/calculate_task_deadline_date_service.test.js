import chai from 'chai';
import calculateTaskDeadlineDateService from '../../../../src/admin/services/calculate_task_deadline_date_service';
import Course from "../../../../src/common/models/course";
import LearningSemester from "../../../../src/common/models/learningSemester";
import Task from "../../../../src/common/models/task";
import moment  from "moment";


describe('Admin calculate task deadline date service', () => {
    let expect = chai.expect;

    const getCourse = () => {
        const courseFinishDate = moment('2017-12-01');
        return new Course(1, courseFinishDate, null, null, null, null);
    };

    const getTasks = () => {
        return [
            new Task(1, null, null, 1, 1, null, null, null),
            new Task(2, null, null, 4, 2, null, null, null),
            new Task(3, null, null, 2, 3, null, null, null),
        ];
    };

    const getLearningSemester = () => {
        const fromDate = moment('2017-09-01').format();
        const toDate = moment('2017-12-21').format();

        return new LearningSemester(1, fromDate, toDate);
    };

    it('list of courses should be generated correctly', async () => {
        const course = getCourse();
        const tasks = getTasks();
        const learningSemester = getLearningSemester();

        const calculatedTasks = calculateTaskDeadlineDateService.calculateDeadlineDate(course, tasks,learningSemester);

        expect(calculatedTasks[0].deadlineDate.format()).to.equal(moment('2017-09-14T00:00:00+03:00').format());
        expect(calculatedTasks[1].deadlineDate.format()).to.equal(moment('2017-11-04T23:00:00+02:00').format());
        expect(calculatedTasks[2].deadlineDate.format()).to.equal(moment('2017-11-30T23:00:00+02:00').format());
    });
});
