class AuthException extends Error {
    constructor (message, status = 403, state = 0) {
        super(message);
        this.message = message;
        this.name = "Auth Error";
        this.state = state;
        this.status = status;
    }
}

module.exports = {
    AuthException,
};