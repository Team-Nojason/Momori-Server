const UserRepository = require('../repositories/auth.repository.js');
const Jwt = require('../utils/jwt.util');
const GrassScheduler = require("../tasks/grasses.scheduler");

class UserController {
    signUp = async (req, res) => {
        const response = await UserRepository.signup(req.body);
        res.status(200).send(response);
        await GrassScheduler.updateAllGrasses();
    };

    signIn = async (req, res) => {
        const result = await UserRepository.signIn(req.body);
        res.status(200).json(result);
    };

    getAccessToken = async (req, res) => {
        const refreshToken = req.body.refreshToken
        await Jwt.decodePayload(refreshToken);
        const accessToken = Jwt.makeAccessToken({refreshToken: `${refreshToken}`,})
        res.status(200).json({ accessToken: accessToken })
    }

    checkDuplicateNickName = async (req, res) => {
        await UserRepository.findByNickName(req.params.nickName);
        res.status(200).json({message: '사용 가능 닉네임'});
    }

}

module.exports = new UserController;