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
        const subject = (attributes.subject)
            ? Subject.fromArray({
                id: attributes.subject,
            })
            : undefined;

        return new Theme(
            attributes.id,
            attributes.title,
            subject,
        );
    }
}
