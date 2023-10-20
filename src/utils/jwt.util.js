const jwtUtil = require('jsonwebtoken');
require('dotenv').config();

decodePayload = async (token) => {
    if (!token) {
        // throw new TokenMissingException();
    }

    try {
        await jwtUtil.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            // throw new TokenExpiredException();
        } else {
            // throw new TokenVerificationException();
        }
    }
};




module.exports = { decodePayload };