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
    console.log('3')
    return jwtUtil.verify(token, process.env.JWT_SECRET, (err) => {
        console.log('4')

        if (err) {
            if (err.name === 'TokenExpiredError') {
                throw new AuthException('TokenExpiredException', 401);

            }
            throw new AuthException('TokenVerificationException', 403);
        }
    });
};




module.exports = { makeRefreshToken, makeAccessToken, decodePayload };