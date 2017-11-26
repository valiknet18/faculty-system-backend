import Task from "../models/task";

export default class Tasks {
    /**
     * Group tasks by columns
     * @param {Array} tasks
     */
    static group(tasks) {
        let groupedTasks = {
            backlog: [],
            inProgress: [],
            done: [],
            checked: [],
        };

        for (let task of tasks) {
            groupedTasks[task.status].push(
                Task.fromArray(task)
            );
        }

        return groupedTasks;
    }
}
