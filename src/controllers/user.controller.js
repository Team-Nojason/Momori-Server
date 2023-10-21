const UserRepository = require('../repositories/user.repository');

class UserController {


    loginUser = async (req, res) => {
        const body = req.body;
        const result = await UserRepository.login(body);
        res.send(result);
    }

    joinUser = async (req, res) => {
        const body = req.body;
        const result = await UserRepository.join(body);
        res.send(result);
    }

    refresh = async (req, res) => {
        const body = req.body;
        const result = await UserRepository.refresh(body);
        res.send(result);
    }
}

module.exports = new UserController();