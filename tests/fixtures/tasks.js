import { createTaskService } from "../../src/api/services/admin/tasks";

const tasks = [
    {
        title: 'Task 1',
        content: 'Tasks content',
        theme: 1,
    },
    {
        title: 'Task 2',
        content: 'Tasks content',
        theme: 1
    }
];

const fixtures = async () => {
    for (let task of tasks) {
        await createTaskService(task);
    }
};

export default fixtures;
