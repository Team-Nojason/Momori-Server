const {authRouter, postRouter, commentRouter, greatRouter} = require('../routes/routes');
const {log} = require("../middleware/log.middleware");

class RoutesLoader {
    static initRoutes (app, version) {
        app.use('/*', log);
        app.use(`/auth`, authRouter);
        app.use(`/post`, postRouter);
        app.use(`/comment`, commentRouter);
        app.use(`/great`, greatRouter);
    }
}

module.exports = {RoutesLoader};