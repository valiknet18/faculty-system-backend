import Subject from '../models/subject';

export const serializeList = (subjects) => {
    let result = [];
    
    for (let subjectAttributes of subjects) {
        let subject = Subject.fromArray(subjectAttributes);

        result.push(serialize(subject));
    }

    return result;
}

export const serialize = (subject) => {
    return {
        subject: {
            name: subject.getSubjectName()
        },
        teacher: {
            full_name: subject.getTeacherFullName(),
            phone: subject.getTeacherPhone(),
            email: subject.getTeacherEmail()
        },
        group: {
            name: subject.getGroupName()
        }
    }
}
