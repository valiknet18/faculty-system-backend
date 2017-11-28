import subjectsService from "../../src/admin/services/subjects_service";

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
        await subjectsService.createSubject(subject);
    }
};

export default fixtures;
