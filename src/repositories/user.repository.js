const UserModel = require("../models/user.model");
const {AuthException} = require("../utils/exceptions/auth.exception");
const {OAuth2Client} = require('google-auth-library');
const {Config} = require("../configs/config");
const {makeRefreshToken, makeAccessToken, decodePayload} = require("../utils/jwt.util");

class UserRepository {

    login = async (body) => {
        console.log('user-repository-login: ', body);
        const {id_token, platform_type} = body;

        // valid id-token
        const client = new OAuth2Client();
        let ticket
        try {
            ticket = await client.verifyIdToken({
                idToken: id_token,
                audience: Config.GOOGLE_CLIENT_ID
            });
        } catch (e) {
            console.log(e);
            throw new AuthException('Invalid IdToken', 401);
        }
        let payload;
        try {
            payload = ticket.getPayload();
            console.log('user-repository: ', payload);
        } catch (e) {
            console.log(e);
            throw new AuthException('Not Found Payload in Token', 401);
        }

        // login
        const email = payload.email;
        const isExistUser = await UserModel.existByEmailAndPlatformType(email, platform_type);
        if (!isExistUser) {
            console.log('not found user');
            throw new AuthException('Not Fount User', 404);
        }

        // make token
        const refreshToken = makeRefreshToken({
            email: email
        });

        const accessToken = makeAccessToken({
            email: email
        });
        return {
            refresh_token: refreshToken,
            access_token: accessToken
        };
    };

    join = async (body) => {
        const {id_token, profile_url, nickname, platform_type, fcm_key} = body;

        // valid id-token
        const client = new OAuth2Client();
        let ticket
        try {
            ticket = await client.verifyIdToken({
                idToken: id_token,
                audience: Config.GOOGLE_CLIENT_ID
            });
        } catch (e) {
            console.log(e);
            throw new AuthException('Invalid IdToken', 401);
        }
        let payload;
        try {
            payload = ticket.getPayload();
            console.log('user-repository: ', payload);
        } catch (e) {
            console.log(e);
            throw new AuthException('Not Found Payload in Token', 401);
        }
        const email = payload.email;
        await UserModel.insert(email, profile_url, nickname, platform_type, fcm_key);

        // make token
        const refreshToken = makeRefreshToken({
            email: email
        });

        const accessToken = makeAccessToken({
            email: email
        });
        return {
            refresh_token: refreshToken,
            access_token: accessToken
        };
    }

    refresh = async (body) => {
        console.log('user-repository-refresh: ', body);

        const {refresh_token} = body;

        if (!refresh_token) {
            throw new AuthException('TokenMissingException', 401);
        }

        const payload = await decodePayload(refresh_token);

        console.log('user-repository-refresh-payload', payload)

        if (!payload.email) {
            throw new AuthException('NotFoundEmailInToken', 401);
        }

        const access_token = makeAccessToken({
            email: payload.email
        });

        return {
            refresh_token: refresh_token,
            access_token: access_token
        };
    };
}

module.exports = new UserRepository();