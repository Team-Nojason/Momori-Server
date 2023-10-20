class AuthException extends Error {
    constructor (message, status = 403, code = 0) {
        super(message);
        this.message = message;
        this.name = "Auth Error";
        this.code = code;
        this.error = this.constructor.name;
        this.status = status;
    }
}

module.exports = {
    AuthException,
};