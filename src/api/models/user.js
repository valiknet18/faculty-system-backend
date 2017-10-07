export default class User {
    constructor(
        id, firstName, lastName, middleName, email, role, isAdmin, scienceDegree, phone, groupId, password
    ) {
        this._id = id;
        this._firstName = firstName;
        this._lastName = lastName;
        this._middleName = middleName
        this._email = email;
        this._role = role;
        this._isAdmin = isAdmin;
        this._scienceDegree = scienceDegree;
        this._phone = phone;
        this._groupId = groupId;
        this._password = password;
    }

    getId() {
        return this._id;
    }

    getFirstName() {
        return this._firstName;
    }
    
    getLastName() {
        return this._lastName;
    }

    getMiddleName() {
        return this._middleName;
    }

    getEmail() {
        return this._email;
    }

    getRole() {
        return this._role;
    }

    getIsAdmin() {
        return this._isAdmin;
    }

    getScienceDegree() {
        return this._scienceDegree;
    }

    getPhone() {
        return this._phone;
    }

    getGroupId() {
        return this._groupId;
    }

    getPassword() {
        return this._password;
    }

    static fromArray(parameters) {
        return new User(
            parameters['id'],
            parameters['first_name'], 
            parameters['last_name'], 
            parameters['middle_name'],
            parameters['email'],
            parameters['role'],
            parameters['is_admin'],
            parameters['science_degree'],
            parameters['phone'],
            parameters['group_id'],
            parameters['password']
        );
    }    
}
