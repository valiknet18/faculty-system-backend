export default class InvitedUser {
    constructor(email) {
        this.email = email;
    }

    static fromArray(attributes) {
        return new InvitedUser(
            attributes.email,
        );
    }
}
