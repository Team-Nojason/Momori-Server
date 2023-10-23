const {authRouter, postRouter} = require('../routes/routes');
const {log} = require("../middleware/log.middleware");

class RoutesLoader {
    static initRoutes (app, version) {
        app.use('/*', log);
        app.use(`/user`, authRouter);
        app.use(`/post`, postRouter);
    }
}

module.exports = {RoutesLoader};