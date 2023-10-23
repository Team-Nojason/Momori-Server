const {userRouter, postRouter} = require('../routes/routes');
const {log} = require("../middleware/log.middleware");

class RoutesLoader {
    static initRoutes (app, version) {
        app.use('/*', log);
        app.use(`/user`, userRouter);
        app.use(`/post`, postRouter);
    }
}

module.exports = {RoutesLoader};