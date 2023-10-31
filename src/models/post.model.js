const { DBService } = require('../db/db-service');
const { tables } = require('../utils/tableNames.utils');
const BaseModel = require("./base.model");
const {getCurrentTime} = require("../utils/time");

class PostModel extends BaseModel {

    constructor(props) {
        super(props);
        this.tableName = tables.Post;
    }

    insert = async (content, latitude, longitude, is_public, user_id) => {
        const sql = `INSERT INTO ${this.tableName}
                    (content, created_at, updated_at, latitude, longitude, is_public, user_id)
                    VALUES (?, ?, ?, ?, ?, ?)`;
        const id = (await DBService.query(sql, [content, getCurrentTime(), getCurrentTime(), latitude, longitude, is_public, user_id])).insertId;
        const selectSql = `SELECT * FROM ${this.tableName} WHERE post_id = ?`;
        const createdPost = (await DBService.query(selectSql, [id]))[0]
        createdPost.is_public = !!(createdPost.is_public);
        return createdPost;
    };

    findById = async (id) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
        return (await DBService.query(sql, [id]))[0];
    };

    findByUserId = async (user_id) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE user_id = ?`;
        return await DBService.query(sql, [user_id]);
    };

    deleteById = async (post_id) => {
        const sql = `DELETE FROM ${this.tableName} WHERE post_id = ?`;
        return await DBService.query(sql, [post_id]);
    };

    update = async (post_id, content, latitude, longitude, is_public, user_id) => {
        const sql = `UPDATE ${this.tableName}
                    SET
                        content = ?,
                        latitude = ?,
                        longitude = ?,
                        updated_at = ?,
                        is_public = ?,
                        user_id = ?
                    WHERE post_id = ?`;
        await DBService.query(sql, [content, latitude, longitude, getCurrentTime(), is_public, user_id, post_id]);
        const selectSql = `SELECT * FROM ${this.tableName} WHERE post_id = ?`;
        return await DBService.query(selectSql, [post_id]);
    };
}

module.exports = new PostModel();