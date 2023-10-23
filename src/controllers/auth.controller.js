const AuthRepository = require("../repositories/auth.repository");

class AuthController {

    login = async (req, res) => {
        const body = req.body;
        const result = await AuthRepository.login(body);
        res.send(result);
    }

    check = async (req, res) => {
        const headers = req.headers;
        const result = await AuthRepository.check(headers);
        res.send(result);
    }

    refresh = async (req, res) => {
        const body = req.body;
        const result = await AuthRepository.refresh(body);
        res.send(result);
    }

    join = async (req, res) => {
        const body = req.body;
        const result = await AuthRepository.join(body);
        res.status(200).send(result);
    }
}

module.exports = new AuthController();