import '../../src/config';

import groupsFixtures from './groups';
import usersFixtures from './users';
import subjectsFixtures from './subjects';
import themesFixtures from './themes';
import tasksFixtures from './tasks';
import learningSemestersFixtures from './learning-semesters';
import coursesFixtures from './courses';
import testsFixtures from './tests';
import questionsFixtures from './questions';

let functions = [
    groupsFixtures,
    usersFixtures,
    subjectsFixtures,
    testsFixtures,
    questionsFixtures,
    themesFixtures,
    tasksFixtures,
    learningSemestersFixtures,
    coursesFixtures,
];

const loadFixtures = async () => {
    for (let f of functions) {
        await f();
    }
};

export default loadFixtures;
