const { Config } = require("../../configs/config");
const { ErrorCodes } = require("../errorCodes.utils");
const { ErrorStatusCodes } = require("../errorStatusCodes.utils");

class ApiExceptions extends Error {
    constructor (code, message, status = 401) {
        super(message);
        if (Config.NODE_ENV === "dev") this.message = "Api Error: " + message;
        else this.message = message;
        this.name = "Api Error";
        this.code = code;
        this.error = this.constructor.name;
        this.status = status;
    }
}

class InternalServerException extends ApiExceptions {
    constructor (message){
        super(ErrorCodes.InternalServerException, message, ErrorStatusCodes.InternalServerException);
    }
}

class AlreadyExistFriendRequestException extends ApiExceptions {
    constructor(message) {
        super(ErrorCodes.AlreadyExistFriendRequestException, message, ErrorStatusCodes.AlreadyExistFriendRequestException);
    }
}

module.exports = {
    InternalServerException,
    AlreadyExistFriendRequestException
};
