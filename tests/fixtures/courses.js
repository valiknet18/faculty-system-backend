import coursesService from "../../src/admin/services/courses_service";

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
        await coursesService.createCourse(course);
    }
};

export default fixtures;
