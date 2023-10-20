const {tables} = require("../utils/tableNames.utils");
const {DBService} = require("../db/db-service");

class BaseModel {
    constructor(tableName) {
        this.tableName = tableName;
    }

    findById = async (id) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
        return (await DBService.query(sql, [id]))[0];
    }

    findAll = async () => {
        const sql = `SELECT * FROM ${this.tableName}`;
        return await DBService.query(sql);
    }

    deleteById = async (id) => {
        const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
        return (await DBService.query(sql, [id]))[0];
    }

    existById = async (id) => {
        const sql = `SELECT COUNT(*) FROM ${this.tableName} WHERE id = ?`;
        return (await DBService.query(sql, [id])) > 0;
    }
}

module.exports = BaseModel;