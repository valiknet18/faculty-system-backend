export default class Subject {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    setId(id) {
        this.id = id;
    }

    static fromArray(attributes) {
        return new Subject(
            attributes.id,
            attributes.name
        );
    }
}
