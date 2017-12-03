import coursesService from "../../src/admin/services/courses_service";

const courses = [
    {
        subject: 1,
        group: 1,
        teacher: 1,
        learningSemester: 1,
        finishDate: '2017-12-01T10:00:00+0000'
    },
];

const fixtures = async () => {
    for (let course of courses) {
        await coursesService.createCourse(course);
    }
};

export default fixtures;
