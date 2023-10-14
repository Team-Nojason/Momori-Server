const jwt = require("jsonwebtoken");
const {TokenMissingException, TokenExpiredException, TokenVerificationException} = require("../utils/exceptions/auth.exception");

auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return new TokenMissingException();

    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return new TokenExpiredException();
            }
            return new TokenVerificationException();
        } else {
            next();
        }
    });
};

module.exports = {auth};
