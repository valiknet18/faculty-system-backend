import CourseTask from "../../common/models/course_task";
import moment from "moment";

const SINGLE_DAY = 1000 * 60 * 60 * 24;

class CalculateTaskDeadlineDateService {
    /**
     *
     * @param {Course} course
     * @param {Array.<Task>} tasks
     * @param {LearningSemester} learningSemester
     * @return {Array.<CourseTask>}
     */
    calculateDeadlineDate(course, tasks, learningSemester) {
        let diffInDays = this.calculateDiffInDays(course.finishDate, learningSemester.fromDate);
        let pointsSum = this.calculateCountPoints(tasks);
        let countDaysPerTask = diffInDays/pointsSum;
        let lastDate = learningSemester.fromDate.format();
        let result = [];

        for (let task of tasks) {
            let lastDateInMilliseconds = moment(lastDate).valueOf() + (countDaysPerTask * task.points * SINGLE_DAY);
            lastDate = moment(lastDateInMilliseconds).format();
            let courseTask = CourseTask.fromArray({
                deadlineDate: lastDate,
                taskId: task.id,
            });

            result.push(courseTask);
        }

        return result;
    }

    /**
     * @param {Array.<Task>} tasks
     */
    calculateCountPoints(tasks) {
        let pointsSum = 0;

        for (let task of tasks) {
            pointsSum += task.points;
        }

        return pointsSum;
    }

    calculateDiffInDays(finishDate, startDate) {
        return Math.round((finishDate - startDate) / SINGLE_DAY);
    }
}

export default new CalculateTaskDeadlineDateService();
