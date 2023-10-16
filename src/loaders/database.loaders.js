const { Config } = require("../configs/config.js");
const { DBService } = require("../db/db-service");

class DatabaseLoader {
    static init (){
        DBService.init({
            host: Config.DB_HOST,
            user: Config.DB_USER,
            port: Config.DB_PORT,
            password: Config.DB_PASS,
            database: Config.DB_DATABASE,
        });

        DBService.checkConnection();
    }
}

module.exports = { DatabaseLoader };