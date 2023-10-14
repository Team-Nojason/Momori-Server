const jwtUtil = require('jsonwebtoken');
const {TokenMissingException, TokenExpiredException, TokenVerificationException} = require("./exceptions/auth.exception");
require('dotenv').config();

makeRefreshToken = (payload) => {
    return jwtUtil.sign(
        payload,
        process.env.JWT_SECRET,
        {
            algorithm: 'HS256',
            expiresIn: '14d',
            issuer: 'bestswlkh0310'
        }
    );
}

makeAccessToken = (payload) => {
    return jwtUtil.sign(
        payload,
        process.env.JWT_SECRET,
        {
            algorithm: 'HS256',
            expiresIn: '30m',
            issuer: 'bestswlkh0310'
        }
    );
}

decodePayload = async (token) => {
    if (!token) {
        throw new TokenMissingException();
    }

    try {
        await jwtUtil.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            throw new TokenExpiredException();
        } else {
            throw new TokenVerificationException();
        }
    }
};




module.exports = { makeRefreshToken, makeAccessToken, decodePayload };