import '../config';

import groupsFixtures from './groups';
import usersFixtures from './users';
import subjectsFixtures from './subjects';
import learningSemestersFixtures from './learning-semesters';
import coursesFixtures from './courses';

const loadFixtures = async () => {
    await groupsFixtures();
    await usersFixtures();
    await subjectsFixtures();
    await learningSemestersFixtures();
    await coursesFixtures();
};

export default loadFixtures;
