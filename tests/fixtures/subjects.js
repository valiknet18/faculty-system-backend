import { createSubjectService } from "../../src/api/services/admin/subjects";

const subjects = [
    {
        name: 'Subject 1',
    },
    {
        name: 'Subject 2',
    }
];

const fixtures = async () => {
    for (let subject of subjects) {
        await createSubjectService(subject);
    }
};

export default fixtures;
