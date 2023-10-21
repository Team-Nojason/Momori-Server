const { ApiExceptions} = require('../utils/exceptions/api.exceptions');

const errorMiddleware = (err, req, res, next) => {
    console.log('path -', req.path)
    if (err.status === 500 || !err.message) new ApiExceptions('Internal server error', 500);
    let { message, state, status } = err;

    const errorResponse = {
        status,
        message,
        state
    };

    console.log('errorResponse', errorResponse);

    res.status(status).send(errorResponse);
}

module.exports = {errorMiddleware};