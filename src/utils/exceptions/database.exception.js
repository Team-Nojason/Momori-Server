const { ErrorCodes } = require("../errorCodes.utils");

class DatabaseException extends Error {
    constructor (code, message, status = 500) {
        super(message);
        this.message = message;
        this.name = "Database Error";
        this.code = code;
        this.error = this.constructor.name;
        this.status = status;
    }
}

module.exports = {
    DatabaseException,
};