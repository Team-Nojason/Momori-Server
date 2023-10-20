const mysql2 = require('mysql2');
const {DatabaseException} = require("../utils/exceptions/database.exception");

class DBService {
    // instance 초기화
    init({host, user, port, password, database}) {
        this.dbInstance = mysql2.createConnection({
            host: host,
            user: user,
            port: port,
            password: password,
            database: database,
        });
    }
    
    // 진짜 연결
    checkConnection() {
        this.dbInstance.connect();
    }

    // 쿼리문
    query = async (sql, values) => {
        return new Promise((resolve, reject) => {
            const callback = (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            };
            // 쿼리 보내기
            this.dbInstance.execute(sql, values, callback);
        });
    };
}

module.exports.DBService = new DBService();