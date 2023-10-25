const UserModel = require("../models/user.model");
const {AuthException} = require("../utils/exceptions/auth.exception");
const {OAuth2Client} = require('google-auth-library');
const {Config} = require("../configs/config");
const {makeRefreshToken, makeAccessToken, decodePayload, getPayloadFromHeader} = require("../utils/jwt.util");

class AuthRepository {

    login = async (body) => {
        const {id_token, platform_type} = body;

        if (platform_type === 'G') {
            // valid id-token
            const client = new OAuth2Client();
            let verifiedToken
            try {
                verifiedToken = await client.verifyIdToken({
                    idToken: id_token,
                    audience: Config.GOOGLE_CLIENT_ID
                });
            } catch (e) {
                console.log(e);
                throw new AuthException(`Invalid IdToken ${e.message}`, 400);
            }
            const payload = verifiedToken.getPayload();

            // login
            const {email} = payload;
            const isExistUser = await UserModel.existByEmailAndPlatformType(email, platform_type);

            if (!isExistUser) {
                throw new AuthException('Not Register User', 401);
            }

            // make tokens
            const refreshToken = makeRefreshToken({
                email: email,
                platform_type: platform_type
            });

            const accessToken = makeAccessToken({
                email: email,
                platform_type: platform_type
            });
            return {
                refresh_token: refreshToken,
                access_token: accessToken
            };
        } else {
            return {
                message: 'is not google'
            }
        }
    };

    check = async (headers) => {
        const payload = await getPayloadFromHeader(headers);
        const {email, platform_type} = payload;
        console.log(email, platform_type);
        if (!email || !platform_type) throw new AuthException('Invalid Token', 401);
        const isExistUser = await UserModel.existByEmailAndPlatformType(email, platform_type);
        if (!isExistUser) {
            throw new AuthException('Not Found User', 401);
        }
        return {
            message: 'valid user'
        };
    }

    refresh = async (body) => {
        const {refresh_token} = body;

        const payload = await decodePayload(refresh_token);

        const {email, platform_type} = payload;

        if (!email || !platform_type) {
            throw new AuthException('Invalid Token', 401);
        }

        const access_token = makeAccessToken({
            email: email,
            platform_type: platform_type
        });

        return {
            refresh_token: refresh_token,
            access_token: access_token
        };
    };

    join = async (body) => {
        const {id_token, profile_url, nickname, platform_type, fcm_key} = body;

        // valid id-token
        const client = new OAuth2Client();
        let verifiedToken
        try {
            verifiedToken = await client.verifyIdToken({
                idToken: id_token,
                audience: Config.GOOGLE_CLIENT_ID
            });
        } catch (e) {
            console.log(e);
            throw new AuthException(`Invalid IdToken ${e.message}`, 400);
        }
        const payload = verifiedToken.getPayload();

        // login
        const {email} = payload;
        const isExistUser = await UserModel.existByEmailAndPlatformType(email, platform_type);
        if (isExistUser) {
            throw new AuthException('Already Exist User', 400);
        }

        await UserModel.insert(email, profile_url, nickname, platform_type, fcm_key);

        // make tokens
        const refreshToken = makeRefreshToken({
            email: email,
            platform_type: platform_type
        });

        const accessToken = makeAccessToken({
            email: email,
            platform_type: platform_type
        });

        return {
            refresh_token: refreshToken,
            access_token: accessToken
        };
    }
}

module.exports = new AuthRepository();