const { InternalServerException } = require('../utils/exceptions/api.exceptions');

const errorMiddleware = (err, req, res, next) => {
    if (err.status === 500 || !err.message) new InternalServerException('Internal server error');
    let { message, state, error, status } = err;

    const errorResponse = {
        status,
        message,
        state
    };

    console.log(errorResponse);

    res.status(status).send(errorResponse);
}

module.exports = {errorMiddleware};