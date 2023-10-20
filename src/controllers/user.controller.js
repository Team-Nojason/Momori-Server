const UserRepository = require('../repositories/user.repository');

class UserController {

    registerUser = async (req, res) => {
        const body = req.body;
        console.log('user-controller ', body);
        await UserRepository.insert(body);
        res.send('success');
    };

    loginUser = async (req, res) => {
        const body = req.body;
        const result = await UserRepository.login(body);
        res.send(result);
    }
}

module.exports = new UserController();