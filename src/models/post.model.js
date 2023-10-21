const { DBService } = require('../db/db-service');
const { tables } = require('../utils/tableNames.utils');
const BaseModel = require("./base.model");

class PostModel extends BaseModel {

    constructor(props) {
        super(props);
        this.tableName = tables.Post;
    }

    insert = async (content, created_at, latitude, longitude, is_public, user_id) => {
        console.log(content, created_at, latitude, longitude, is_public, user_id)
        const sql = `INSERT INTO ${this.tableName}
                    (content, created_at, latitude, longitude, is_public, user_id)
                    VALUES (?, ?, ?, ?, ?, ?)`;
        const id = (await DBService.query(sql, [content, created_at, latitude, longitude, is_public, user_id])).insertId;
        const selectSql = `SELECT * FROM ${this.tableName} WHERE post_id = ?`;
        return (await DBService.query(selectSql, [id]))[0];
    }
}

module.exports = new PostModel();