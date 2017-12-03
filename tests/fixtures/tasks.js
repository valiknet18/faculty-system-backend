import tasksService from "../../src/admin/services/tasks_service";

const tasks = [
    {
        title: 'Task 1',
        content: 'Tasks content',
        theme: 1,
        test_id: 1,
        points: 0,
    },
    {
        title: 'Task 2',
        content: 'Tasks content',
        theme: 1,
        test_id: 1,
        points: 10,
    }
];

const fixtures = async () => {
    for (let task of tasks) {
        await tasksService.createTask(task);
    }
};

export default fixtures;
