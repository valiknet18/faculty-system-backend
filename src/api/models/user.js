const STUDENT_ROLE = 'student';
const TEACHER_ROLE = 'teacher';

export default class User {
    constructor(
        id, firstName, lastName, middleName, email, role, isAdmin, scienceDegree, phone, groupId, password
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.email = email;
        this.role = role;
        this.isAdmin = isAdmin;
        this.scienceDegree = scienceDegree;
        this.phone = phone;
        this.groupId = groupId;
        this.password = password;
    }

    getId() {
        return this.id;
    }

    getFirstName() {
        return this.firstName;
    }
    
    getLastName() {
        return this.lastName;
    }

    getMiddleName() {
        return this.middleName;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return this.role;
    }

    getIsAdmin() {
        return this.isAdmin;
    }

    getScienceDegree() {
        return this.scienceDegree || this.role;
    }

    getPhone() {
        return this.phone;
    }

    getGroupId() {
        return this.groupId;
    }

    getPassword() {
        return this.password;
    }

    isTeacher() {
        return this.role === TEACHER_ROLE;
    }

    isStudent() {
        return this.role === STUDENT_ROLE;
    }

    static fromArray(parameters) {
        return new User(
            parameters['id'],
            parameters['first_name'], 
            parameters['last_name'], 
            parameters['middle_name'],
            parameters['email'],
            parameters['role'],
            parameters['is_admin'] || false,
            parameters['science_degree'] || '',
            parameters['phone'],
            parameters['group_id'],
            parameters['password']
        );
    }    
}
