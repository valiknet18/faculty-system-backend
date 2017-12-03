import User from "./user";
import Theme from "./theme";
import Test from "./test";

export default class Task {
    /**
     * @param {int} id
     * @param {String} title
     * @param {String} content
     * @param {String} status
     * @param {Integer} points
     * @param {Integer} priority
     * @param {User} student
     * @param {Theme} theme
     * @param {Test} test
     */
    constructor(id, title, content, status, points, priority, student, theme, test) {
        this.id = parseInt(id);
        this.title = title;
        this.content = content;
        this.status = status;
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
        const test = attributes.test_id
            ? Test.fromArray({
                id: attributes.test_id,
              })
            : null;

        return new Task(
            attributes.id,
            attributes.title,
            attributes.content,
            attributes.status,
            attributes.points,
            attributes.priority,
            User.fromArray({
                first_name: attributes.student_first_name,
                last_name: attributes.student_last_name,
            }),
            Theme.fromArray({
                id: attributes.theme,
            }),
            test,
        );
    }
}
