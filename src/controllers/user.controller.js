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

    saveUser = async (req, res) => {
        const result = UserRepository.save(res.body);
        res.status(200).send(result);
    }

    deleteById = async (req, res) => {
        const result = UserRepository.deleteById(req.query.id);
        res.status(200).send({message: '삭제 완료'});
    }

    deleteByBjId = async (req, res) => {
        const result = UserRepository.deleteById(req.query.bjId);
        res.status(200).send({message: '삭제 완료'});
    }

    deleteByNickName = async (req, res) => {
        const result = UserRepository.deleteById(req.query.nickName);
        res.status(200).send({message: '삭제 완료'});
    }
}

module.exports = UserController();