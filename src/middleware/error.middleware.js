const { InternalServerException } = require('../utils/exceptions/api.exceptions');

const errorMiddleware = (err, req, res, next) => {
    if (err.status === 500 || !err.message) new InternalServerException('Internal server error');
    let { message, code, error, status } = err;

    const headers = {
        success: "0",
        error,
        code,
        message
    };
    console.log(headers);

    res.status(status).send({headers, body: {}});
}

module.exports = {errorMiddleware};