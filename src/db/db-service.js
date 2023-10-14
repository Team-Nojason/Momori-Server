const mysql2 = require('mysql2');
const { InternalServerException } = require('../utils/exceptions/api.exceptions');

class DBService {
    init({host, user, port, password, database}) {
        this.dbInstance = mysql2.createConnection({
            host: host,
            user: user,
            port: port,
            password: password,
            database: database,
        });
    }

    checkConnection() {
        this.dbInstance.connect();
    }

    query = async (sql, values) => {
        return new Promise((resolve, reject) => {
            const callback = (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            };
            this.dbInstance.execute(sql, values, callback);
        }).catch((err) => {
            return null;
        });
    }
}

module.exports.DBService = new DBService();