import Test from "./test";

export default class Question {
    constructor(id, title, content, type, test) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.type = type;
        this.test = test;
    }

    setId(id) {
        this.id = id;
    }

    static fromArray(attributes) {
        return new Question(
            attributes.id,
            attributes.title,
            attributes.content,
            attributes.type,
            Test.fromArray({
                id: attributes.test,
            })
        );
    }
}
