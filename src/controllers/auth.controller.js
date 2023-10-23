const UserRepository = require("../repositories/user.repository");

class AuthController {

    login = async (req, res) => {
        console.log('loginuser', req.path)
        const body = req.body;
        const result = await UserRepository.login(body);
        res.send(result);
    }

    join = async (req, res) => {

        console.log('join')

        const body = req.body;
        const result = await UserRepository.join(body);
        res.send(result);
    }

    check = async (req, res) => {

    }

    refresh = async (req, res) => {
        console.log('refresh')

        const body = req.body;
        const result = await UserRepository.refresh(body);
        res.send(result);
    }

}

module.exports = new AuthController();