const userRouter = require('../routes/user.routes');

class RoutesLoader {
    static initRoutes (app, version) {
        app.use(`/api/${version}/sign`, userRouter);
    }
}

module.exports = {RoutesLoader};