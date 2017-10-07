export default class Course {
    constructor(id, subjectName, groupName, teacherFullName, teacherPhone, teacherEmail) {
        this._id = id;
        this._subjectName = subjectName;
        this._teacherFullName = teacherFullName;
        this._teacherPhone = teacherPhone;
        this._teacherEmail = teacherEmail;
        this._groupName = groupName;
    }

    getId() {
        return this._id;
    }

    getSubjectName() {
        return this._subjectName;
    }

    getTeacherFullName() {
        return this._teacherFullName;
    }

    getTeacherPhone() {
        return this._teacherPhone;
    }

    getTeacherEmail() {
        return this._teacherEmail;
    }

    getGroupName() {
        return this._groupName;
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
