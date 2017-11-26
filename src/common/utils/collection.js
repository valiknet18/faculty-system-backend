export default class Collection {
    /**
     * @param model
     * @param rows
     * @return {Array}
     */
    static convert(model, rows) {
        const collection = [];

        for (let row of rows) {
            collection.push(
                model.fromArray(row)
            );
        }

        return collection;
    }
}
