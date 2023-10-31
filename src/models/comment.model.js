const { DBService } = require('../db/db-service');
const { tables } = require('../utils/tableNames.utils');
const BaseModel = require("./base.model");
const {getCurrentTime} = require("../utils/time");


class CommentModel extends BaseModel {

    constructor(props) {
        super(props);
        this.tableName = tables.Comment;
    }

    findByPostId = async (post_id) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE = ?`;
        return await DBService.query(sql, [post_id]);
    }

    insert = async (comment, post_id, user_id) => {
        console.log(comment, post_id, user_id);
        const sql = `INSERT INTO ${this.tableName} (comment, created_at, post_id, user_id) VALUES (?, ?, ?, ?)`;
        const created = await DBService.query(sql, [comment, getCurrentTime(), post_id, user_id]);
        console.log(created);
    };

    delete = async (comment_id) => {
        const sql = `DELETE FROM ${this.tableName} WHERE comment_id = ?`;
        await DBService.query(sql, [comment_id]);
    }
}

module.exports = new CommentModel();