import User from "./user";
import Theme from "./theme";

export default class Task {
    /**
     * @param {int} id
     * @param {String} title
     * @param {String} content
     * @param {String} status
     * @param {User} student
     * @param {Theme} theme
     */
    constructor(id, title, content, status, student, theme) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.status = status;
        this.student = student;
        this.theme = theme;
    }

    setId(id) {
        this.id = id;
    }

    /**
     * @param {Object} attributes
     * @return {Task}
     */
    static fromArray(attributes) {
        return new Task(
            attributes.id,
            attributes.title,
            attributes.content,
            attributes.status,
            User.fromArray({
                first_name: attributes.student_first_name,
                last_name: attributes.student_last_name,
            }),
            Theme.fromArray({
                id: attributes.theme,
            })
        );
    }
}
