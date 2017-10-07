export default class User {
    constructor(id, firstName, lastName, email) {
        this._id = id;
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
    }

    static toArray() {
        return {
            id: this._id,
            firstName: this._firstName,
            lastName: this._lastName,
            email: this._email
        };
    }

    static fromArray(parameters) {
        return new self(
            parameters['firstName'], 
            parameters['lastName'], 
            parameters['email']
        );
    }    
}
