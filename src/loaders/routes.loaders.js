const userRouter = require('../routes/user.routes');
const postRouter = require('../routes/post.routes')

class RoutesLoader {
    static initRoutes (app, version) {
        app.use(`/users`, userRouter);
        app.use(`/post`, postRouter);
    }
}

module.exports = {RoutesLoader};