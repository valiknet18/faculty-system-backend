import humps from 'humps';

export const STUDENT_ROLE = 'student';
export const TEACHER_ROLE = 'teacher';

export default class User {
    constructor(id, firstName, lastName, middleName, email, role, isAdmin, scienceDegree, phone, groupId, password) {
        this.id = parseInt(id);
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.email = email;
        this.role = role;
        this.isAdmin = isAdmin;
        this.scienceDegree = scienceDegree || this.role;
        this.phone = phone;
        this.groupId = groupId || null;
        this.password = password;
    }

    setId(id) {
        this.id = id;
    }

    isTeacher() {
        return this.role === TEACHER_ROLE;
    }

    isStudent() {
        return this.role === STUDENT_ROLE;
    }

    static fromArray(attributes) {
        attributes = humps.camelizeKeys(attributes);

        return new User(
            attributes.id,
            attributes.firstName,
            attributes.lastName,
            attributes.middleName,
            attributes.email,
            attributes.role,
            attributes.isAdmin || false,
            attributes.scienceDegree || null,
            attributes.phone,
            attributes.groupId,
            attributes.password
        );
    }    
}
