const express = require("express");

class ExpressLoaders {
    static init () {
        const app = express();
        app.use(express.json());

        return app;
    }
}

module.exports = { ExpressLoader: ExpressLoaders };