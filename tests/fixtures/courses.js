import { createCourseService } from "../../src/api/services/admin/courses";

const courses = [
    {
        subject: 1,
        group: 1,
        teacher: 1,
        learningSemester: 1,
    },
];

const fixtures = async () => {
    for (let course of courses) {
        await createCourseService(course);
    }
};

export default fixtures;
