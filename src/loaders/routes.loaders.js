const userRouter = require('../routes/user.routes');

class RoutesLoader {
    static initRoutes (app, version) {
        app.use(`/users`, userRouter);
    }
}

module.exports = {RoutesLoader};