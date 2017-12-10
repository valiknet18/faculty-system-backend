import Subject from "./subject";
import User from "./user";
import Group from "./group";
import LearningSemester from "./learningSemester";
import humps from 'humps';
import moment from "moment";

export default class Course {
    /**
     * @param {int} id
     * @param {Date} finishDate
     * @param {Subject} subject
     * @param {Group} group
     * @param {User} teacher
     * @param {LearningSemester} learningSemester
     */
    constructor(id, finishDate, subject, group, teacher, learningSemester) {
        this.id = parseInt(id);
        this.finishDate = moment(finishDate);
        this.subject = subject;
        this.group = group;
        this.teacher = teacher;
        this.learningSemester = learningSemester;
    }

    /**
     * @param {int} id
     */
    setId(id) {
        this.id = id;
    }

    /**
     * @param {Object} attributes
     * @return {Course}
     */
    static fromArray(attributes) {
        attributes = humps.camelizeKeys(attributes);

        const subject = (attributes.subject || attributes.subjectName)
            ? Subject.fromArray({
                id: attributes.subject,
                name: attributes.subjectName,
            })
            : undefined;

        const group = (attributes.group || attributes.groupName)
            ? Group.fromArray({
                id: attributes.group,
                name: attributes.groupName,
            })
            : undefined;

        const teacher = (attributes.teacher || attributes.teacherFirstName || attributes.teacherLastName ||
                        attributes.teacherPhone || attributes.teacherEmail)
            ? User.fromArray({
                id: attributes.teacher,
                first_name: attributes.teacherFirstName,
                last_name: attributes.teacherLastName,
                phone: attributes.teacherPhone,
                email: attributes.teacherEmail,
            })
            : undefined;

        const learningSemester = (attributes.learningSemester)
            ? LearningSemester.fromArray({
                id: attributes.learningSemester,
            })
            : undefined;

        return new Course(
            attributes.id,
            attributes.finishDate,
            subject,
            group,
            teacher,
            learningSemester,
        );
    }
}
