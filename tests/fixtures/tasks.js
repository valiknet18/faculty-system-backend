import tasksService from "../../src/admin/services/api/tasks_service";

const tasks = [
    {
        title: 'Task 1',
        content: 'Tasks content',
        themeId: 1,
        testId: 1,
        points: 2,
        priority: 1,
    },
    {
        title: 'Task 2',
        content: 'Tasks content',
        themeId: 1,
        testId: 1,
        points: 10,
        priority: 2,
    }
];

const fixtures = async () => {
    for (let task of tasks) {
        await tasksService.createTask(task);
    }
};

export default fixtures;
