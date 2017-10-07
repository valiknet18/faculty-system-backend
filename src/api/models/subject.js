export default class Subject {
    constructor(id, name) {
        this._id = id;
        this._name = name;
    }

    getId() {
        return this._id;
    }

    getName() {
        return this._name;
    }

    static fromArray(parameters) {
        return new Subject(
            parameters['id'],
            parameters['name']
        );
    }
}
