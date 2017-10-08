export default class Subject {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    static fromArray(parameters) {
        return new Subject(
            parameters['id'],
            parameters['name']
        );
    }
}
