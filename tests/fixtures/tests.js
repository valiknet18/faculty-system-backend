import testsService from "../../src/admin/services/tests_service";

const tests = [
    {
        title: 'Test 1',
        subject: 1,
    },
    {
        title: 'Test 2',
        subject: 1
    }
];

const fixtures = async () => {
    for (let test of tests) {
        await testsService.createTest(test);
    }
};

export default fixtures;
