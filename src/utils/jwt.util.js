const jwtUtil = require('jsonwebtoken');
const {AuthException} = require("./exceptions/auth.exception");
require('dotenv').config();

makeRefreshToken = (payload) => {
    return jwtUtil.sign(
        payload,
        process.env.JWT_SECRET,
        {
            algorithm: 'HS256',
            expiresIn: '14d',
            issuer: 'test'
        }
    );
}

makeAccessToken = (payload) => {
    return jwtUtil.sign(
        payload,
        process.env.JWT_SECRET,
        {
            algorithm: 'HS256',
            expiresIn: '2h',
            issuer: 'test'
        }
    );
}

decodePayload = async (token) => {
    if (!token) {
        throw new AuthException('TokenMissingException', 403);
    }
    return jwtUtil.decode(token, process.env.JWT_SECRET, (err) => {

        if (err) {
            if (err.name === 'TokenExpiredError') {
                throw new AuthException('TokenExpiredException', 401);

            }
            throw new AuthException('TokenVerificationException', 403);
        }
    });
};

getTokenFromHeader = async (header) => {
    const authorization = header.authorization;
    if (!authorization) return ""
    return authorization.split(' ')[1]
}

getPayloadFromHeader = async (header) => {
    const token = await getTokenFromHeader(header);
    return await decodePayload(token);
}



module.exports = { makeRefreshToken, makeAccessToken, decodePayload, getTokenFromHeader, getPayloadFromHeader };