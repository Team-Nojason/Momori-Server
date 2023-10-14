module.exports.ErrorStatusCodes = {
    NotFoundException: 404,
    InvalidEndpointException: 404,

    TokenMissingException: 401,
    TokenExpiredException: 401,
    TokenVerificationException: 403,

    SignUpFailedException: 204,
    AlreadyExistFriendRequestException: 204,

    InternalServerException: 500
};