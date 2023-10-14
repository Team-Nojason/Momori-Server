const { ExpressLoader } = require('./loaders/express.loaders.js');
const { DatabaseLoader } = require('./loaders/database.loaders');
const { RoutesLoader } = require('./loaders/routes.loaders');
const { TasksLoader } = require('./loaders/tasks.loaders');
const { MiddlewareLoader } = require('./loaders/middleware.loaders')
const { Config } = require('./configs/config.js');

startServer = async () => {
    const app = ExpressLoader.init();

    await DatabaseLoader.init();
    await RoutesLoader.initRoutes(app, "v1");
    await MiddlewareLoader.init(app);

    const port = Number(Config.PORT);

    await TasksLoader.init();

    app.listen(port, () => {
        console.log(`서버 열렸어용 ${port}`);
    });
}

startServer().then(() => {});

module.exports = startServer;
