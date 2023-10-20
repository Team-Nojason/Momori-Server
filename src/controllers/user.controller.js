const UserRepository = require('../repositories/user.repository');

class UserController {


    loginUser = async (req, res) => {
        const body = req.body;
        const result = await UserRepository.login(body);
        res.send(result);
    }
}

module.exports = new UserController();