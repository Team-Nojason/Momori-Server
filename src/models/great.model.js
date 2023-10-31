const {tables} = require("../utils/tableNames.utils");
const BaseModel = require("./base.model");
const {DBService} = require("../db/db-service");
const {getCurrentTime} = require("../utils/time");

class GreatModel extends BaseModel {

    constructor(props) {
        super(props);
        this.tableName = tables.Great;
    }

    findByPostId = async (postId) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE post_id = ?`;
        return (await DBService.query(sql, [postId])).length;
    }

    insert = async (userId, postId) => {
        const sql = `INSERT INTO ${this.tableName}
                    (user_id, postId, created_at)
                    VALUES (?, ?, ?)`;
        await DBService.query(sql, [userId, postId, getCurrentTime()]);
    }

    delete = async (userId, postId) => {
        const sql = `DELETE FROM ${this.tableName} WHERE user_id = ? AND post_id = ?`;
        await DBService.query(sql, [userId, postId]);
    }
}