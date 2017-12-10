import Test from "./test";

export const SINGLE_ANSWER_TYPE = 'single';
export const MULTIPLE_ANSWERS_TYPE = 'multiple';
export const WRITE_TYPE = 'write';
export const RELATIONS_TYPE = 'relations';

export default class Question {
    constructor(id, title, content, type, answers, test) {
        this.id = parseInt(id);
        this.title = title;
        this.content = content;
        this.type = type;
        this.answers = {
            answers: answers
        };
        this.test = test;
    }

    setId(id) {
        this.id = id;
    }

    static fromArray(attributes) {
        const test = (attributes.test)
            ? Test.fromArray({
                id: attributes.test,
            })
            : undefined;

        return new Question(
            attributes.id,
            attributes.title,
            attributes.content,
            attributes.type,
            attributes.answers,
            test,
        );
    }
}
