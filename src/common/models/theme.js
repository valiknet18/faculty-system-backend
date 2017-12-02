import Subject from "./subject";

export default class Theme {
    constructor(id, title, subject) {
        this.id = parseInt(id);
        this.title = title;
        this.subject = subject;
    }

    setId(id) {
        this.id = id;
    }

    static fromArray(attributes) {
        return new Theme(
            attributes.id,
            attributes.title,
            Subject.fromArray({
                id: attributes.subject,
            }),
        );
    }
}
