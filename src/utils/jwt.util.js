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
    let payload;
    try {
        payload = await jwtUtil.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            throw new AuthException('TokenExpiredException', 401);
        } else {
            throw new AuthException('TokenVerificationException', 403);
        }
    }
    return payload;
};




module.exports = { makeRefreshToken, makeAccessToken, decodePayload };