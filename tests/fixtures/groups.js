import groupsService from "../../src/admin/services/api/groups_service";

const groups = [
    {
        name: 'Group 1',
    }
];

const fixtures = async () => {
    for (let group of groups) {
        await groupsService.createGroup(group);
    }
};

export default fixtures;
