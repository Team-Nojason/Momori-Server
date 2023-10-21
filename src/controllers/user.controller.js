const UserRepository = require('../repositories/user.repository');

class UserController {


    loginUser = async (req, res) => {
        console.log('loginuser', req.path)
        const body = req.body;
        const result = await UserRepository.login(body);
        res.send(result);
    }

    joinUser = async (req, res) => {
        console.log('join')

        const body = req.body;
        const result = await UserRepository.join(body);
        res.send(result);
    }

    refresh = async (req, res) => {
        console.log('refresh')

        const body = req.body;
        const result = await UserRepository.refresh(body);
        res.send(result);
    }

    a = async (req, res) => {
        res.send('test')
    }
}

module.exports = new UserController();