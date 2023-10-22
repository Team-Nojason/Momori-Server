const jwt = require("jsonwebtoken");
const {AuthException} = require("../utils/exceptions/auth.exception");

auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    console.log(authHeader);

    if (!token) {
        throw new AuthException('TokenMissingException', 403);
    }
    var isNotNext = true;
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                console.log('a')
                throw new AuthException('TokenExpiredException', 401);
            }
            console.log('b')
            throw new AuthException('TokenVerificationException', 403);
        } else {
            isNotNext = false;
            return next();
        }
    });
    if (isNotNext)
        return next();
};

module.exports = {auth};
