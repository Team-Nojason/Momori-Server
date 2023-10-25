const { DBService } = require('../db/db-service');
const { tables } = require('../utils/tableNames.utils');
const BaseModel = require("./base.model");

class UserModel extends BaseModel {

    constructor(props) {
        super(props);
        this.tableName = tables.User;
    }

    findById = async (id) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
        return (await DBService.query(sql, [id]))[0];
    }

    findByEmailAndPlatformType = async (email, platform_type) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE email = ? AND platform_type = ?`;
        return (await DBService.query(sql, [email, platform_type]))[0];
    }

    insert = async (email, profile_url, nickname, platform_type, fcm_key) => {
        console.log('user-model ', email, profile_url, nickname, platform_type, fcm_key);
        const sql = `INSERT INTO ${this.tableName}
                    (email, profile_url, nickname, platform_type, fcm_key)
                    VALUES (?, ?, ?, ?, ?)`;
        return await DBService.query(sql, [email, profile_url, nickname, platform_type, fcm_key]);
    };

    existByEmailAndPlatformType = async (email, platform_type) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE email = ? AND platform_type = ?`;
        const user = (await DBService.query(sql, [email, platform_type])).length;
        return user > 0;
    };
}

module.exports = new UserModel();