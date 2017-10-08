import TokenGenerator from 'uuid-token-generator';

export const inviteService = async (parameters) => {
    const query = `
        INSERT INTO invited_users(
            email, token, invited_at, role
        )
        VALUES ($1, $2, $3, $4)
    `;

    const res = db.query(query, [
        parameters['email'],
        new TokenGenerator(256, TokenGenerator.BASE62),
        new Date(),
        parameters['role']
    ]);
};
