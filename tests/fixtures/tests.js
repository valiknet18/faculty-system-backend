import { createTestService } from "../../src/api/services/admin/tests";

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
        await createTestService(test);
    }
};

export default fixtures;
