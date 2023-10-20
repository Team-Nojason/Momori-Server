const { DBService } = require('../db/db-service');
const { tables } = require('../utils/tableNames.utils');
const BaseModel = require("./base.model");

class UserModel extends BaseModel {

    constructor(props) {
        super(props);
        this.tableName = tables.User;
    }

    insert = async (email, profile_url, nickname, platform_type, fcm_key) => {
        console.log('user-model ', email, profile_url, nickname, platform_type, fcm_key);
        const sql = `INSERT INTO ${this.tableName}
                    (email, profile_url, nickname, platform_type, fcm_key)
                    VALUES (?, ?, ?, ?, ?)`;
        return await DBService.query(sql, [email, profile_url, nickname, platform_type, fcm_key]);
    }
}

module.exports = new UserModel();