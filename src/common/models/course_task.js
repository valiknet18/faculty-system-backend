import Task from "./task";
import Course from "./course";
import User from "./user";
import humps from 'humps';
import moment from "moment";

export default class CourseTask {
    constructor(id, status, deadlineDate, task, course, user) {
        this.id = id;
        this.deadlineDate = moment(deadlineDate);
        this.status = status;
        this.task = task;
        this.course = course;
        this.user = user;
    }

    static fromArray(attributes) {
        attributes = humps.camelizeKeys(attributes);

        const task = (attributes.taskId || attributes.taskTitle)
            ? Task.fromArray({
                id: attributes.taskId,
                title: attributes.taskTitle,
            })
            : undefined;

        const course = (attributes.courseName)
            ? Course.fromArray({
                name: attributes.courseName,
            })
            : undefined;

        const student = (attributes.userFirstName || attributes.userLastName)
            ? User.fromArray({
                firstName: attributes.userFirstName,
                lastName: attributes.userLastName,
            })
            : undefined;

        return new CourseTask(
            attributes.id,
            attributes.status,
            attributes.deadlineDate,
            task,
            course,
            student,
        );
    }
}
