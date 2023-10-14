const { Config } = require('../configs/config');
const UserModel = require('../models/user.model');
const { structureResponse } = require('../utils/common.utils');
const {
    SignUpFailedException,
    NotFoundUserException,
} = require('../utils/exceptions/auth.exception');
const Jwt = require("../utils/jwt.util");

class AuthRepository {

    findByNickName = async (nickName) => {
        const result = await UserModel.findByNickName(nickName);
        if (!result) throw new NotFoundUserException();
        return result;
    }

    signup = async (body) => {
        const { nickName, pw, bjId, intro, goal } = body
        const result = await UserModel.isExistNickNameOrBjId(nickName, bjId);
        if (result) throw new SignUpFailedException();
        await UserModel.save(nickName, pw, bjId, intro, goal);
    }

    signIn = async (body) => {
        const { nickName, pw } = body
        const result = await UserModel.isExistUser(nickName, pw);
        if (result) {
            const refreshToken = Jwt.makeRefreshToken({nickName: nickName, pw: pw})
            const accessToken = Jwt.makeAccessToken({refreshToken: `${refreshToken}`})
            return {refreshToken: refreshToken, accessToken: accessToken};
        } else {
            throw new NotFoundUserException();
        }
    }
}

module.exports = new AuthRepository;