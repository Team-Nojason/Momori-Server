const jwt = require("jsonwebtoken");
const {AuthException} = require("../utils/exceptions/auth.exception");

auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        throw new AuthException('TokenMissingException', 403);
    }
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                throw new AuthException('TokenExpiredException', 401);

            }
            throw new AuthException('TokenVerificationException', 403);
        } else {
            next();
        }
    });
    next();
};

module.exports = {auth};
