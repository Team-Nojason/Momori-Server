const UserRepository = require('../repositories/user.repository');

class UserController {
    getUserById = async (req, res) => {
        const id = req.query.id;
        const result = UserRepository.findById(id);
        res.status(200).send(result);
    }

    getUserByBjId = async (req, res) => {
        const bjId = req.query.bjId;
        const result = UserRepository.findByBjId(bjId);
        res.status(200).send(result);
    }

    getUserByNickName = async (req, res) => {
        const nickName = req.query.nickName;
        const result = UserRepository.findByNickName(nickName);
        res.status(200).send(result);
    }

    getUsers = async (req, res) => {
        const result = UserRepository.findAll();
        res.status(200).send(result);
    }
}

module.exports = UserController;