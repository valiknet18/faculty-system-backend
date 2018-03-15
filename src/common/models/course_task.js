import Task from "./task";
import Course from "./course";
import User from "./user";
import humps from 'humps';
import moment from "moment";

export default class CourseTask {
    constructor(id, status, createdAt, deadlineDate, task, course, user, teacher) {
        this.id = id;
        this.createdAt = createdAt;
        this.deadlineDate = moment(deadlineDate);
        this.status = status;
        this.task = task;
        this.course = course;
        this.user = user;
        this.teacher = teacher;
    }

    static fromArray(attributes) {
        attributes = humps.camelizeKeys(attributes);

        const task = (attributes.taskId || attributes.taskTitle || attributes.taskContent)
            ? Task.fromArray({
                id: attributes.taskId,
                title: attributes.taskTitle,
                content: attributes.taskContent,
                testId: attributes.testId,
                testTitle: attributes.testTitle,
            })
            : undefined;

        const course = (attributes.courseId || attributes.courseName)
            ? Course.fromArray({
                id: attributes.courseId,
                name: attributes.courseName,
            })
            : undefined;

        const student = (attributes.userFirstName || attributes.userLastName)
            ? User.fromArray({
                firstName: attributes.userFirstName,
                lastName: attributes.userLastName,
            })
            : undefined;

        const teacher = (attributes.teacherEmail)
            ? User.fromArray({
                email: attributes.teacherEmail,
            })
            : undefined;

        return new CourseTask(
            attributes.id,
            attributes.status,
            attributes.createdAt,
            attributes.deadlineDate,
            task,
            course,
            student,
            teacher,
        );
    }
}
