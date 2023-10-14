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

    isExistNickNameOrBjId = async (nickName, bjId) => {
        const sql = 'SELECT COUNT(*) AS count FROM user WHERE nickname = ? OR bj_id = ?';
        const count = await DBService.query(sql, [nickName, bjId])
        return (count[0]['count'] > 0);
    }

    isExistUser = async (nickName, pw) => {
        const sql = 'SELECT COUNT(*) AS count FROM user WHERE nickname = ? AND pw = ?';
        const count = await DBService.query(sql, [nickName, pw])
        return (count[0]['count'] > 0);
    }
}

module.exports = new UserModel;