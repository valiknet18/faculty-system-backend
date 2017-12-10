import User from "./user";
import Theme from "./theme";
import Test from "./test";
import humps from 'humps';

export default class Task {
    /**
     * @param {int} id
     * @param {String} title
     * @param {String} content
     * @param {Integer} points
     * @param {Integer} priority
     * @param {User} student
     * @param {Theme} theme
     * @param {Test} test
     */
    constructor(id, title, content, points, priority, student, theme, test) {
        this.id = parseInt(id);
        this.title = title;
        this.content = content;
        this.points = points;
        this.priority = priority;
        this.student = student;
        this.theme = theme;
        this.test = test;
    }

    setId(id) {
        this.id = id;
    }

    /**
     * @param {Object} attributes
     * @return {Task}
     */
    static fromArray(attributes) {
        attributes = humps.camelizeKeys(attributes);

        const test = attributes.testId
            ? Test.fromArray({
                id: attributes.testId,
              })
            : undefined;

        const student = (attributes.studentFirstName || attributes.studentLastName)
            ? User.fromArray({
                first_name: attributes.studentFirstName,
                last_name: attributes.studentLastName,
            })
            : undefined;

        const theme = (attributes.themeId)
            ? Theme.fromArray({
                id: attributes.themeId,
            })
            : undefined;

        return new Task(
            attributes.id,
            attributes.title,
            attributes.content,
            attributes.points,
            attributes.priority,
            student,
            theme,
            test,
        );
    }
}
