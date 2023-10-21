const userRouter = require('../routes/user.routes');
const postRouter = require('../routes/post.routes')

class RoutesLoader {
    static initRoutes (app, version) {
        app.use(`/users`, userRouter);
        app.use(`/posts`, postRouter);
    }
}

module.exports = {RoutesLoader};