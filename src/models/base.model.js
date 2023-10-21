const {tables} = require("../utils/tableNames.utils");
const {DBService} = require("../db/db-service");

class BaseModel {
    constructor(tableName) {
        this.tableName = tableName;
    }

    findAll = async () => {
        const sql = `SELECT * FROM ${this.tableName}`;
        return await DBService.query(sql);
    }
}

module.exports = BaseModel;