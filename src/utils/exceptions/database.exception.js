const { ErrorStatusCodes } = require("../errorStatusCodes.utils");
const { ErrorCodes } = require("../errorCodes.utils");
const { Config } = require("../../configs/config");

class DatabaseException extends Error {
    constructor (code, message, status = 404) {
        super(message);
        this.message = message;
        this.name = "Database Error";
        this.code = code;
        this.error = this.constructor.name;
        this.status = status;
    }
}

class NotFoundException extends DatabaseException {
    constructor (message){
        super(ErrorCodes.NotFoundException, message);
    }
}

module.exports = {
    NotFoundException,
};