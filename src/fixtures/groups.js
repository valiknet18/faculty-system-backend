import { createGroupService } from '../api/services/groups';

const groups = [
    {
        name: 'Group 1',
    }
];

const fixtures = async () => {
    for (let group of groups) {
        await createGroupService(group);
    }
};

export default fixtures;
