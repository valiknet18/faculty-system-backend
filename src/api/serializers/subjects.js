import Subject from '../models/subject';

export const serializeList = (subjects) => {
    let result = [];

    for (let subjectAttributes of subjects) {
        let subject = Subject.fromArray(subjectAttributes);

        result.push(serialize(subject));
    }

    return result;
};

export const serialize = (subject) => {
    return {
        id: subject.getId(),
        name: subject.getName()
    }
};
