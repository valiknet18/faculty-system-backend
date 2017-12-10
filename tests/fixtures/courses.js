import coursesService from "../../src/admin/services/api/courses_service";
import moment from "moment";

const courses = [
    {
        subject: 1,
        group: 1,
        teacher: 1,
        learningSemester: 1,
        finishDate: moment('2017-12-01').format(),
    },
];

const fixtures = async () => {
    for (let course of courses) {
        await coursesService.createCourse(course);
    }
};

export default fixtures;
