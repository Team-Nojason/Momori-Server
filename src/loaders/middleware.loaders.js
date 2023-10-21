const { ApiExceptions } = require('../utils/exceptions/api.exceptions');
const {errorMiddleware} = require('../middleware/error.middleware');

class MiddlewareLoader {
    static init (app){
        app.all('*', (req, res, next) => {
            const err = new ApiExceptions('invalid endpoint exception', 404);
            next(err);
        });

        app.use(errorMiddleware);
    }
}

module.exports = { MiddlewareLoader };