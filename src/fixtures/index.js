import '../config';

import groupsFixtures from './groups';
import usersFixtures from './users';
import subjectsFixtures from './subjects';

const loadFixtures = async () => {
    await groupsFixtures();
    await usersFixtures();
    await subjectsFixtures();
};

export default loadFixtures;
