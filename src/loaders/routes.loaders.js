const userRouter = require('../routes/auth.routes.js');

class RoutesLoader {
    static initRoutes (app, version) {
        app.use(`/api/${version}/sign`, userRouter);
    }
}

module.exports = {RoutesLoader};