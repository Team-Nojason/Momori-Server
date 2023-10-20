const UserModel = require("../models/user.model");
const {AuthException} = require("../utils/exceptions/auth.exception");
const {OAuth2Client} = require('google-auth-library');
const {Config} = require("../configs/config");
const {makeRefreshToken, makeAccessToken} = require("../utils/jwt.util");

class UserRepository {

    login = async (body) => {
        console.log('user-repository-login: ', body);
        const {id_token, nickname, profile_url, platform_type, fcm_key} = body;

        // valid id-token
        const client = new OAuth2Client();
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: Config.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        console.log('user-repository: ', payload);

        // login
        const email = payload.email;

        const isExistUser = await UserModel.existByEmail(email);
        console.log('exist user??', isExistUser)
        if (!isExistUser) {
            await UserModel.insert(email, profile_url, nickname, platform_type, fcm_key);
        }

        // make token
        const refreshToken = makeRefreshToken({
            email: email
        });

        const accessToken = makeAccessToken({
            email: email
        });
        return {
            refreshToken: refreshToken,
            accessToken: accessToken
        };
    };
}

module.exports = new UserRepository();