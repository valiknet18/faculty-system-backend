import '../config';

import groupsFixtures from './groups';
import usersFixtures from './users';
import subjectsFixtures from './subjects';
import themesFixtures from './themes';
import tasksFixtures from './tasks';
import learningSemestersFixtures from './learning-semesters';
import coursesFixtures from './courses';
import testsFixtures from './tests';

const loadFixtures = async () => {
    await groupsFixtures();
    await usersFixtures();
    await subjectsFixtures();
    await themesFixtures();
    await tasksFixtures();
    await testsFixtures();
    await learningSemestersFixtures();
    await coursesFixtures();
};

export default loadFixtures;
