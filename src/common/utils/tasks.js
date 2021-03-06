import Task from "../models/task";
import CourseTask from "../models/course_task";

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
                CourseTask.fromArray(task)
            );
        }

        return groupedTasks;
    }
}
