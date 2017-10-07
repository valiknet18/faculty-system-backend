import User from '../models/user';

export const serializeList = (users) => {
    let result = [];
    
    for (let userAttributes of users) {
        let user = User.fromArray(userAttributes);

        result.push(serialize(user));
    }

    return result;
};

export const serialize = (user) => {
    return {
        id: user.getId(),
        first_name: user.getFirstName(),
        last_name: user.getLastName(),
        email: user.getEmail(),
        role: user.getRole()
    };
};
