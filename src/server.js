const { ExpressLoader } = require('./loaders/express.loaders.js');
const { DatabaseLoader } = require('./loaders/database.loaders');
const { RoutesLoader } = require('./loaders/routes.loaders');
const { TasksLoader } = require('./loaders/tasks.loaders');
const { MiddlewareLoader } = require('./loaders/middleware.loaders')
const { Config } = require('./configs/config.js');
const CommentModel = require('./models/comment.model');

startServer = async () => {
    const app = ExpressLoader.init();

    DatabaseLoader.init();
    RoutesLoader.initRoutes(app, "v1");
    MiddlewareLoader.init(app);

    const port = Number(Config.PORT);

    TasksLoader.init();

    app.listen(port, () => {
        console.log(`서버 열렸어용 ${port}`);
    });
}   

startServer().then(() => {});

// module.exports = startServer;
