const { DBService } = require('../db/db-service');
const { tables } = require('../utils/tableNames.utils');
const BaseModel = require("./base.model");

class PostModel extends BaseModel {

    constructor(props) {
        super(props);
        this.tableName = tables.Post;
    }

    insert = async (content) => {
        const sql = `INSERT INTO ${this.tableName} 
                    (content)
                    VALUES (?)`;
        await DBService.query(sql, [content]);
    }
}

module.exports = new PostModel();