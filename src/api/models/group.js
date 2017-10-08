export default class Group {
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
        return new Group(
            parameters['id'],
            parameters['name']
        );
    }
}
