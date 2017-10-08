export default class Course {
    constructor(id, subjectName, groupName, teacherFullName, teacherPhone, teacherEmail) {
        this.id = id;
        this.subjectName = subjectName;
        this.teacherFullName = teacherFullName;
        this.teacherPhone = teacherPhone;
        this.teacherEmail = teacherEmail;
        this.groupName = groupName;
    }

    getId() {
        return this.id;
    }

    getSubjectName() {
        return this.subjectName;
    }

    getTeacherFullName() {
        return this.teacherFullName;
    }

    getTeacherPhone() {
        return this.teacherPhone;
    }

    getTeacherEmail() {
        return this.teacherEmail;
    }

    getGroupName() {
        return this.groupName;
    }

    static fromArray(attributes) {
        return new Course(
            attributes['id'],
            attributes['subject_name'],
            attributes['group_name'],
            attributes['teacher_full_name'],
            attributes['teacher_phone'],
            attributes['teacher_email']
        );
    }
}
