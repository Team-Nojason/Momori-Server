const { DBService } = require('../db/db-service');
const { tables } = require('../utils/tableNames.utils');

class UserModel {

    findAll = async () => {
        let sql = `SELECT * FROM ${tables.User}`;
        return await DBService.query(sql);
    }

    findById = async (id) => {
        const sql = `SELECT * FROM ${tables.User} WHERE id = ?`;
        return await DBService.query(sql, [id]);
    }

    findByNickName = async (nickName) => {
        const sql = `SELECT * FROM ${tables.User} WHERE nickname = ?`
        return await DBService.query(sql, [nickName]);
    }

    findByBjId = async (bjId) => {
        const sql = `SELECT * FROM ${tables.User} WHERE bj_id = ?`;
        return await DBService.query(sql, [bjId]);
    }

    save = async (nickName, pw, bjId, intro, goal)  => {
        const sql = `INSERT INTO ${tables.User} (nickname, pw, bj_id, intro, goal) VALUES (?,?,?,?,?)`;
        return await DBService.query(sql, [nickName, pw, bjId, intro, goal]);
    }

    deleteById = async (id) => {
        const sql = `DELETE FROM ${tables.User} WHERE id = ?`;
        return await DBService.query(sql, [id]);
    }

    deleteByBjId = async (bjId) => {
        const sql = `DELETE FROM ${tables.User} WHERE bj_id = ?`;
        return await DBService.query(sql, [bjId]);
    }

    deleteByNickName = async (nickName) => {
        const sql = `DELETE FROM ${tables.User} WHERE nickname = ?`;
        return await DBService.query(sql, [nickName]);
    }

}

module.exports = new UserModel;