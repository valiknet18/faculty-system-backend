export default class Group {
    /**
     * @param {int} id
     * @param {String} name
     */
    constructor(id, name) {
        this.id = parseInt(id);
        this.name = name;
    }

    setId(id) {
        this.id = id;
    }

    /**
     * @param {Array} attributes
     * @return {Group}
     */
    static fromArray(attributes) {
        return new Group(
            attributes.id,
            attributes.name
        );
    }
}
