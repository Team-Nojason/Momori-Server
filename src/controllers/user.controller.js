const UserRepository = require('../repositories/user.repository');

class UserController {

    registerUser = async (req, res) => {
        const body = req.body;
        console.log('user-controller ', body);
        await UserRepository.insert(body);
        res.send('success');
    };
}

module.exports = new UserController();