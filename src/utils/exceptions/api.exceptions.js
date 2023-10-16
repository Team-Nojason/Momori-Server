const { Config } = require("../../configs/config");
const { ErrorCodes } = require("../errorCodes.utils");
const { ErrorStatusCodes } = require("../errorStatusCodes.utils");

class ApiExceptions extends Error {
    constructor (code, message, status = 400) {
        super(message);
        this.message = message;
        this.name = "Api Error";
        this.code = code;
        this.error = this.constructor.name;
        this.status = status;
    }
}

module.exports = {
    ApiExceptions
};
