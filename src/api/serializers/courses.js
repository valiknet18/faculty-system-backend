import Course from '../models/course';

export const serializeList = (courses) => {
    let result = [];
    
    for (let courseAttributes of courses) {
        let course = Course.fromArray(courseAttributes);

        result.push(serialize(course));
    }

    return result;
};

export const serialize = (course) => {
    return {
        id: course.getId(),
        name: course.getSubjectName(),
        teacher: {
            full_name: course.getTeacherFullName(),
            phone: course.getTeacherPhone(),
            email: course.getTeacherEmail()
        },
        group: {
            name: course.getGroupName()
        }
    }
};
