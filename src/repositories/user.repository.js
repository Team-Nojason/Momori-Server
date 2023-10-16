const UserModel = require("../models/user.model");
const {NotFoundUserException} = require("../utils/exceptions/auth.exception");

class UserRepository {
    findById = async (id) => {
        const result = await UserModel.findById(id);
        if (!result) new NotFoundUserException();
        return result;
    }

    findByBjId = async (bjId) => {
        const result = await UserModel.findByBjId(bjId);
        if (!result) new NotFoundUserException();
        return result;
    }

    findByNickName = async (nickName) => {
        const result = await UserModel.findByNickName(nickName);
        if (!result) new NotFoundUserException();
        return result;
    }

    findAll = async () => {
        const result = await UserModel.findAll();
        if (!result) new NotFoundUserException();
        return result;
    }

    save = async (body) => {
        const {nickName, pw, bjId, intro, goal} = body;
        const result = await UserModel.save(nickName, pw, bjId, intro, goal);
        if (!result) new NotFoundUserException();
        return body;
    }

    deleteById = async (id) => {
        const result = await UserModel.deleteById(id);
        if (!result) new NotFoundUserException();
        return {message: 'delete success'};
    }

}
module.exports = new UserRepository();