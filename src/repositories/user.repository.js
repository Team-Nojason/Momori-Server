const UserModel = require("../models/user.model");
const {AuthException} = require("../utils/exceptions/auth.exception");

class UserRepository {
    insert = async (body) => {
        console.log('user-repository ', body);
        const {email, profile_url, nickname, platform_type, fcm_key} = body;
        const result = await UserModel.insert(email, profile_url, nickname, platform_type, fcm_key);
        console.log(result);
    }
}
module.exports = new UserRepository();