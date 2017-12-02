import Subject from "./subject";
import User from "./user";
import Group from "./group";
import LearningSemester from "./learningSemester";

export default class Course {
    /**
     * @param {int} id
     * @param {Subject} subject
     * @param {Group} group
     * @param {User} teacher
     * @param {Object} learningSemester
     */
    constructor(id, subject, group, teacher, learningSemester) {
        this.id = parseInt(id);
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
        return new Course(
            attributes.id,
            Subject.fromArray({
                id: attributes.subject,
                name: attributes.subject_name,
            }),
            Group.fromArray({
                id: attributes.group,
                name: attributes.group_name,
            }),
            User.fromArray({
                id: attributes.teacher,
                first_name: attributes.teacher_first_name,
                last_name: attributes.teacher_last_name,
                phone: attributes.teacher_phone,
                email: attributes.teacher_email,
            }),
            LearningSemester.fromArray({
                id: attributes.learningSemester,
            }),
        );
    }
}
