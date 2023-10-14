const { ErrorStatusCodes } = require("../errorStatusCodes.utils");
const { ErrorCodes } = require("../errorCodes.utils");
const { Config } = require("../../configs/config");

class AuthException extends Error {
    constructor (code, message, status = 401) {
        super(message);
        this.message = message;
        this.name = "Auth Error";
        this.code = code;
        this.error = this.constructor.name;
        this.status = status;
    }
}

class TokenMissingException extends AuthException {
    constructor (message = "Access denied. No token credentials sent"){
        super(ErrorCodes.TokenMissingException, message, ErrorStatusCodes.TokenMissingException);
    }
}

class TokenVerificationException extends AuthException {
    constructor (message = "Authentication failed") {
        super(ErrorCodes.TokenVerificationException, message, ErrorStatusCodes.TokenVerificationException);
    }
}

class TokenExpiredException extends AuthException {
    constructor (message = "JWT expired") {
        super(ErrorCodes.TokenExpiredException, message, ErrorStatusCodes.TokenExpiredException);
    }
}

class NotFoundUserException extends AuthException {
    constructor (message = "Not Found User") {
        super(ErrorCodes.NotFoundUserException, message, ErrorStatusCodes.NotFoundException);
    }
}

class SignUpFailedException extends AuthException {
    constructor (message = "User failed to sign up"){
        super(ErrorCodes.SignUpFailedException, message, ErrorStatusCodes.SignUpFailedException);
    }
}

module.exports = {
    TokenMissingException,
    NotFoundUserException,
    TokenVerificationException,
    TokenExpiredException,
    SignUpFailedException,
};